﻿using Microsoft.Extensions.Options;
using MimeKit;
using StudentsAccounting.BusinessLogic.Interfaces;
using System;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using StudentsAccounting.BusinessLogic.Helpers;

namespace StudentsAccounting.BusinessLogic.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _emailSettings;

        public EmailSender(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("StudentsAccounting.com", _emailSettings.Sender));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, false);
                await client.AuthenticateAsync(_emailSettings.Sender, _emailSettings.Password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }
    }
}
