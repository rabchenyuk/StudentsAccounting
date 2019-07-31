using FluentValidation;

namespace StudentsAccounting.WebAPI.ViewModels.AuthViewModels.Validation
{
    public class ForgotPasswordValidation : AbstractValidator<ForgotPasswordViewModel>
    {
        public ForgotPasswordValidation()
        {
            RuleFor(u => u.Email).EmailAddress().WithMessage("Only email");
        }
    }
}
