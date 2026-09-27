/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: EmployeeForm.cs
 * Path: src/LeeWay.TransitHub.Domain/Entities/EmployeeForm.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Entity
 * Purpose: Represent an employee operational form and approval lifecycle.
 * Inputs: Employee number, form type, details, and status commands.
 * Outputs: EmployeeForm state.
 * Mutation Scope: Form status through methods only.
 * Dependencies: FormStatus.
 * Tests: Application integration tests.
 * Security Impact: Uses fictional employee identifiers only.
 * Database Impact: Maps to EmployeeForm records.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Domain.Entities;

public sealed class EmployeeForm
{
    public EmployeeForm(Guid id, string employeeNumber, string formType, string details)
    {
        if (id == Guid.Empty) throw new ArgumentException("Form ID cannot be empty.", nameof(id));
        Id = id;
        EmployeeNumber = Require(employeeNumber, nameof(employeeNumber));
        FormType = Require(formType, nameof(formType));
        Details = Require(details, nameof(details));
        Status = FormStatus.Draft;
        CreatedUtc = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; }
    public string EmployeeNumber { get; }
    public string FormType { get; }
    public string Details { get; }
    public FormStatus Status { get; private set; }
    public DateTimeOffset CreatedUtc { get; }

    public void Submit() => Status = FormStatus.Submitted;
    public void Approve() => Status = FormStatus.Approved;
    public void Reject() => Status = FormStatus.Rejected;

    private static string Require(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("A non-empty value is required.", parameterName);
        return value.Trim();
    }
}
