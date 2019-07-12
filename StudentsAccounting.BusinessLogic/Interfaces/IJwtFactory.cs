using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace StudentsAccounting.BusinessLogic.Interfaces
{
    public interface IJwtFactory
    {
        string GenerateEncodedToken(List<Claim> claim);
    }
}
