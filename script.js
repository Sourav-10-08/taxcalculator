document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const income = parseFloat(document.getElementById('income').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;
        const age = document.getElementById('age').value;

        // Validation
        const errors = validateForm(income, extraIncome, deductions, age);
        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }

        // Calculate tax
        const tax = calculateTax(income, extraIncome, deductions, age);

        // Show tax result as a prompt
        if (tax > 0) {
            alert(`Your tax amount is: ${tax.toFixed(2)} Lakhs`);
        } else {
            alert('No tax applicable.');
        }
    });

    function validateForm(income, extraIncome, deductions, age) {
        const errors = [];

        if (isNaN(income) || income <= 0) {
            errors.push('Invalid gross annual income');
        }

        if (isNaN(extraIncome) || extraIncome < 0) {
            errors.push('Invalid extra income');
        }

        if (isNaN(deductions) || deductions < 0) {
            errors.push('Invalid deductions');
        }

        if (!age) {
            errors.push('Age group is required');
        }

        return errors;
    }

    function displayErrors(errors) {
        const errorFields = ['incomeError', 'extraIncomeError', 'deductionsError', 'ageError'];
        errorFields.forEach(function (field) {
            document.getElementById(field).style.display = 'none';
        });

        errors.forEach(function (error, index) {
            document.getElementById(errorFields[index]).style.display = 'inline-block';
            document.getElementById(errorFields[index]).setAttribute('title', error);
        });
    }

    function calculateTax(income, extraIncome, deductions, age) {
        const taxableIncome = income + extraIncome - deductions;
        let tax = 0;

        if (taxableIncome > 8000000) {
            if (age === 'below40') {
                tax = 0.3 * (taxableIncome - 8000000);
            } else if (age === '40to60') {
                tax = 0.4 * (taxableIncome - 8000000);
            } else if (age === 'above60') {
                tax = 0.1 * (taxableIncome - 8000000);
            }
        }

        return tax;
    }
});
