/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ICustomerCaseRepository.cs
 * Path: src/LeeWay.TransitHub.Application/Abstractions/ICustomerCaseRepository.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Abstraction
 * Purpose: Declare the replaceable application contract ICustomerCaseRepository.
 * Inputs: Domain identifiers and entities.
 * Outputs: Repository or evidence operations.
 * Mutation Scope: Contract only; implementation owns mutation.
 * Dependencies: Domain and Governance types.
 * Tests: Integration and architecture tests.
 * Security Impact: Creates a boundary for future authorization and data access.
 * Database Impact: Implemented by in-memory and future database adapters.
 * Sovereign Cycle: Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Entities;

namespace LeeWay.TransitHub.Application.Abstractions;

public interface ICustomerCaseRepository
{
    IReadOnlyCollection<CustomerCase> GetAll();
    void Add(CustomerCase customerCase);
}
