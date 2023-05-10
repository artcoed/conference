using FluentResults;
using FluentValidation;

namespace Conference.FluentValidationExtensions
{
    public static class FluentValidationExtensions
    {
        /// <summary>
        /// This method we can apply in command validators, example in CreateProductCommandValidator.cs
        /// </summary>
        public static IRuleBuilderOptions<T, string> CanCreate<T, TValueObjectInput>(this IRuleBuilder<T, string> ruleBuilder,
            Func<string, Result<TValueObjectInput>> canCreateValueObject)
        {
            return (IRuleBuilderOptions<T, string>)ruleBuilder.Custom((value, context) =>
            {
                var result = canCreateValueObject(value);
                if (result.IsFailed)
                {
                    foreach (var reason in result.Reasons)
                    {
                        context.AddFailure(reason.Message);
                    }
                }
            });
        }
    }
}
