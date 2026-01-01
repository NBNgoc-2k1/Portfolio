using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Office = Microsoft.Office.Core;
using Outlook = Microsoft.Office.Interop.Outlook;

// TODO:  Follow these steps to enable the Ribbon (XML) item:

// 1: Copy the following code block into the ThisAddin, ThisWorkbook, or ThisDocument class.

//  protected override Microsoft.Office.Core.IRibbonExtensibility CreateRibbonExtensibilityObject()
//  {
//      return new Ribbon1();
//  }

// 2. Create callback methods in the "Ribbon Callbacks" region of this class to handle user
//    actions, such as clicking a button. Note: if you have exported this Ribbon from the Ribbon designer,
//    move your code from the event handlers to the callback methods and modify the code to work with the
//    Ribbon extensibility (RibbonX) programming model.

// 3. Assign attributes to the control tags in the Ribbon XML file to identify the appropriate callback methods in your code.  

// For more information, see the Ribbon XML documentation in the Visual Studio Tools for Office Help.


namespace OutlookAddIn1
{
    [ComVisible(true)]
    public class Ribbon1 : Office.IRibbonExtensibility
    {
        private Office.IRibbonUI ribbon;

        public Ribbon1()
        {
        }

        #region IRibbonExtensibility Members

        public string GetCustomUI(string ribbonID)
        {
            return GetResourceText("OutlookAddIn1.Ribbon1.xml");
        }

        #endregion

        #region Ribbon Callbacks
        //Create callback methods here. For more information about adding callback methods, visit https://go.microsoft.com/fwlink/?LinkID=271226

        public void Ribbon_Load(Office.IRibbonUI ribbonUI)
        {
            this.ribbon = ribbonUI;
        }

        private async Task SaveEmailToSystem(Outlook.MailItem mail)
        {
            // Get the Outlook namespace
            Outlook.NameSpace ns = Globals.ThisAddIn.Application.GetNamespace("MAPI");

            // Get the Current User object
            Outlook.AddressEntry currentUser = ns.CurrentUser.AddressEntry;

            string userName = ns.CurrentUser.Name; 
            string tempFile = Path.Combine(Path.GetTempPath(), mail.Subject + ".msg");
            mail.SaveAs(tempFile, Outlook.OlSaveAsType.olMSG);

            using (var client = new HttpClient())
            {
                using (var content = new MultipartFormDataContent())
                {
                    // Add File
                    var fileContent = new ByteArrayContent(File.ReadAllBytes(tempFile));
                    content.Add(fileContent, "emailFile", "email.msg");

                    // Add Data
                    content.Add(new StringContent(mail.Subject), "subject");
                    content.Add(new StringContent(userName), "processedByName");
                    var response = await client.PostAsync("https://localhost:44346/api/emails/upload", content);
                    if (response.IsSuccessStatusCode)
                        MessageBox.Show("Saved successfully!");
                }
                File.Delete(tempFile);
            }

        }

        public void OnSaveEmailClick(Office.IRibbonControl control)
        {
            // In Outlook context menus, 'control.Context' is the Selection object
            Outlook.Selection selection = control.Context as Outlook.Selection;

            if (selection != null && selection.Count > 0)
            {
                object item = selection[1];
                if (item is Outlook.MailItem mail)
                {
                    // Call your upload logic here
                    _ = SaveEmailToSystem(mail);
                }
            }
        }

        #endregion

        #region Helpers

        private static string GetResourceText(string resourceName)
        {
            Assembly asm = Assembly.GetExecutingAssembly();
            string[] resourceNames = asm.GetManifestResourceNames();
            for (int i = 0; i < resourceNames.Length; ++i)
            {
                if (string.Compare(resourceName, resourceNames[i], StringComparison.OrdinalIgnoreCase) == 0)
                {
                    using (StreamReader resourceReader = new StreamReader(asm.GetManifestResourceStream(resourceNames[i])))
                    {
                        if (resourceReader != null)
                        {
                            return resourceReader.ReadToEnd();
                        }
                    }
                }
            }
            return null;
        }

        #endregion
    }
}
