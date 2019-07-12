using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsAccounting.WebAPI.ViewModels.AuthViewModels.Validation
{
    public class LoginValidation : AbstractValidator<LoginViewModel>
    {
        public LoginValidation()
        {
            RuleFor(u => u.Login).NotEmpty().WithMessage("This field can't be empty");
            RuleFor(u => u.Login).EmailAddress().WithMessage("Only email");
            RuleFor(u => u.Password).MinimumLength(6).WithMessage("Not less than 6 characters");
        }
    }
}
