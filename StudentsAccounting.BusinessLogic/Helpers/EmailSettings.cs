﻿namespace StudentsAccounting.BusinessLogic.Helpers
{
    public class EmailSettings
    {
        public int Id { get; set; }
        public string MailServer { get; set; }
        public int MailPort { get; set; }
        public string SenderName { get; set; }
        public string Sender { get; set; }
        public string Password { get; set; }
    }
}
