$(document).ready(function(){
	// Select Wrapper
	$('#town_filter').wrap('<span class="town_filter_select_wrap"/>');
	
	// Custom Select
	$(function() {
	    $('.converter_select_cont select, .town_filter_select_wrap select').customStyle();
	});
	
	// Focus/Blur Textbox
	$(function(){
		$('input[type^="text"]').each(function(){
			var txtval = $(this).val();
			
			$(this).focus(function(){
				if($(this).val() == $(this).attr("alt")) {									
					$(this).attr("value", "");
				}
			});
			
			$(this).blur(function(){
				if($(this).val() == ""){
					$(this).val(txtval);
				}
			});
		});
	});
	
	// Converter Tabs
	$('.modal_tabs li a').click(function(){
		$('.modal_tabs li').removeClass('active');
		$(this).parent().addClass('active');
		$('.tabs_content').removeClass('active');
		$(this.rel).addClass('active');		 
		return false;
	});
	
	// Bring Lightbox
	$('.currency_converter_tool').click(function(){
		$('.black_overlay, .modal_cont').fadeIn();
		$('.currency_conveter_modal').stop().animate({'left':'0px'},1000);
	});
	
	$(".loan_calculator_tool").click(function(){
		$('.black_overlay, .calculator_modal_cont').fadeIn();
		$('.loan_calculator_modal').stop().animate({'left':'0px'},1000);
	});
	
	// Close Lightbox
	$('.close_modal_btn').click(function(){
		$('.currency_conveter_modal').stop().animate({'left':'-400px'},1000);
		$('.black_overlay, .modal_cont').delay(1000).fadeOut();	
	});
	
	$(".calculator_close_modal_btn").click(function(){
		$('.loan_calculator_modal').stop().animate({'left':'-400px'},1000);
		$('.black_overlay, .calculator_modal_cont').delay(1000).fadeOut();	
	});
	
	// Contact Us Tabs 
	$('.contact_tabs li a').click(function(){
		$('.contact_tabs li').removeClass('active');
		$(this).parent().addClass('active');
		$('.contact_tabs_content').removeClass('active');
		$(this.rel).addClass('active');		 
		return false;
	});
	
	
	// Mobile Menu
	$('#header_inner_section').append($('<a class="mobi_menu"/>')); 
	
	$('.mobi_menu').click(function(){
		$('#menus_cont').slideToggle();
	});

	//Currency Converter
	$("#convert_currency").click(function(){
		var validation = new Validation();
		
		var primary_currency = document.getElementById('primary_currency');
		var secondary_currency = document.getElementById('secondary_currency');
		var amount_to_convert = document.getElementById('amount_field');
		
		if(validation.validate_string(primary_currency)){
			if(validation.validate_string(primary_currency)){
				if(validation.validate_number(amount_to_convert)){
					$.ajax({
						url: BASE_URL+"/includes/helper.php",
						data: $("#converter_form").serialize(),
						beforeSend: function(){
							var loading_img = "<img src='"+BASE_URL+"/templates/oriental-main/images/ajax-loader.gif' />"
							$("#converter_notification_area").html(loading_img);
							$("#converter_notification_area").fadeIn("slow");
						}
					}).success(function(responce){
						$("#converter_notification_area").empty().html(responce);
					});
				}
			}
		}
	});
	
	$("#calulate_loan").click(function(){
		var validation = new Validation();
		
		var loan_amount = document.getElementById('loan_amount');
		var repayment_period = document.getElementById('repayment_period');
		
		if(validation.validate_number(loan_amount)){
			if(validation.validate_number(repayment_period)){
				$.ajax({
					url: BASE_URL+"/includes/loan.php",
					data: $("#loan_form").serialize(),
					beforeSend: function(){
						var loading_img = "<img src='"+BASE_URL+"/templates/oriental-main/images/ajax-loader.gif' />"
						$("#loan_notification_area").empty().html(loading_img);
						$("#loan_notification_area").fadeIn("slow");
					}
				}).success(function(responce){
					if(responce != ""){
						var loanData = $.parseJSON(responce);
						var returnString = "<table>"+
								"<tr>"+
									"<td><strong>Monthly payment:</strong></td>"+
									"<td>"+loanData.monthly_repayment+"</td>"+
								"</tr>"+
								"<tr>"+
									"<td><strong>Total Repayments:</strong></td>"+
									"<td>"+loanData.total_months+"</td>"+
								"</tr>"+
								"<tr>"+
									"<td><strong>Total interest:</strong></td>"+
									"<td>"+loanData.total_interest+"</td>"+
								"</tr>"+
								"<tr>"+
									"<td><strong>Total Loan Cost:</strong></td>"+
									"<td>"+loanData.total_loan_cost+"</td>"+
								"</tr>"+
						"</table>";
						$("#loan_notification_area").empty().html(returnString);
						$("#loan_form")[0].reset();
					}else{
						$("#loan_notification_area").empty().html("Please try again.");
					}
				});
			}else{
				var error = "Please enter a valid number (Wrong: <strike>Two years</strike>, Right: 2)";
				$("#loan_error_area").empty().html(error);
				$("#loan_error_area").fadeIn(400).delay(5000).fadeOut(400);	
			}
		}else{
			var error = "Please enter a valid number (Wrong: <strike>1,000.00</strike>, Right: 1000)";
			$("#loan_error_area").empty().html(error);
			$("#loan_error_area").fadeIn(400).delay(5000).fadeOut(400);
		}
	})
});