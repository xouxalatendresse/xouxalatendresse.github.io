$(document).ready(function () {
    // Tab navigation
    $("li").click(function() {
        $("li").removeClass("current");
        $("div").removeClass("current");

        $(this).addClass("current");

        var tabId = $(this).attr("data-tab");
        $("#" + tabId).addClass("current");
    });

    // Show/hide "top" button
    var offset = 250;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $("#top-button").show();
        } else {
            $("#top-button").hide();
        }
    });

    // Handle expense form submission
    $("#expenseForm").submit(function(event) {
        event.preventDefault();

        // Get form values
        var date = $("#date").val();
        var amount = parseFloat($("#amount").val());
        var name = $("#name").val();
        var category = $("#dropx").val();

        // Validate input
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        // Create a new row
        var newRow = $("<tr>");
        newRow.append($("<td>").text(date));
        newRow.append($("<td>").text("$" + amount.toFixed(2)));
        newRow.append($("<td>").text(name));
        newRow.append($("<td>").text(category));

        // Append new row to table
        $("#expenseTable tbody").append(newRow);

        // Update total expense
        updateTotalExpense();

        // Clear form
        $("#expenseForm")[0].reset();
    });

    // Function to update total budget
    function updateTotalBudget() {
        var total = 0;

        // Sum up all amounts in the budget table
        $("#budgetTable tbody tr").each(function() {
            var amountText = $(this).find("td:eq(1)").text();
            var amount = parseFloat(amountText.replace('$', ''));
            if (!isNaN(amount)) {
                total += amount;
            }
        });

        // Update total budget display in the footer
        $("#totalBudgetAmount").text("$" + total.toFixed(2));
    }

    // Function to update total expense
    function updateTotalExpense() {
        var totalExpense = 0;

        // Sum up all amounts in the expense table
        $("#expenseTable tbody tr").each(function() {
            var amountText = $(this).find("td:eq(1)").text();
            var amount = parseFloat(amountText.replace('$', ''));
            if (!isNaN(amount)) {
                totalExpense += amount;
            }
        });

        // Update total expense display in the footer
        $("#totalExpense").text("$" + totalExpense.toFixed(2));
    }

    // Create footer row for total expense and append to the expense table
    if ($("#expenseTable tfoot").length === 0) {
        var expenseFooterRow = $("<tfoot><tr><td colspan='3'>Total Expense:</td><td id='totalExpense'>$0.00</td></tr></tfoot>");
        $("#expenseTable").append(expenseFooterRow);
    }

    // Create footer row for total budget and append to the budget table
    if ($("#budgetTable tfoot").length === 0) {
        var budgetFooterRow = $("<tfoot><tr><td colspan='1'>Total Budget:</td><td id='totalBudgetAmount'>$0.00</td></tr></tfoot>");
        $("#budgetTable").append(budgetFooterRow);
    }

    // Budget form submission
    $("#budgetForm").submit(function(event) {
        event.preventDefault();

        // Get form values
        var category = $("#budgetCategory").val();
        var amount = parseFloat($("#budgetAmount").val());

        // Validate input
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        // Creating a new row
        var newRow = $("<tr>");
        newRow.append($("<td>").text(category));
        newRow.append($("<td>").text("$" + amount.toFixed(2)));

        // Append the new row to table
        $("#budgetTable tbody").append(newRow);

        // Update the total budget
        updateTotalBudget();

        // Clear form
        $("#budgetForm")[0].reset();
    });

    // Handle the click event for the calculate button in tab 3
    $("#calculate-button").on('click', function() {
        // Get the value of the paycheck input
        var paycheck = parseFloat($("#paycheck").val());

        // Check if the input is a valid number
        if (isNaN(paycheck) || paycheck <= 0) {
            $("#result").text('Please enter a valid paycheck amount.');
        } else {
            // Calculate 30% of the paycheck
            var savings = paycheck * 0.30;

            // Display the result to the user
            $("#result").text('You should save $' + savings.toFixed(2) + ' from your paycheck.');
        }
    });
});
