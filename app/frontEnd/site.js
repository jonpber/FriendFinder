$(function(){
	var currentQuestion = 1;


	$(".surveySubmit").on("click", function(){
		event.preventDefault();

		var inputs = $(".quizSelect");
		var answers = []

		var filledOutOkay = true;

		for (i = 0; i < inputs.length; i++){
			if (inputs[i].value[0] === "S"){
				filledOutOkay = false;
			}
			answers[i] = inputs[i].value[0];
		}
		
		if ($(".nameInput").val() === "" || $(".photoInput").val() === ""){
			filledOutOkay = false;
		}

		if (filledOutOkay){
			$(".quizInputs").css("color", "black");
			$(".quizInputs").css("font-weight", "normal");
			var user = {
				name: $(".nameInput").val(),
				photo: $(".photoInput").val(),
				scores: answers
			}
			$.post("/api/friends", user).done(function(data){
				$(".resultName").text(data.name);
				$(".resultPic").attr("src", data.photo);
				$(".modals").fadeIn();
				$(".modalContent").fadeIn();
			});
		}

		else {
			$(".quizInputs").css("color", "red");
			$(".quizInputs").css("font-weight", "bold");
		}


	});

	$(".homeButton").on("click", function(){
		window.location.href = "/survey";
	});

	$(".close").on("click", function(){
		closeModal();
	});

	$(".closeButton").on("click", function(){
		closeModal();
	});

	$(".modals").on("click", function(){
		closeModal();
	});


	function closeModal(){
		resetQuiz();
		$("#q" + currentQuestion).closest(".questionDiv").hide();
		$(".surveySubmit").hide();
		$("#q1").closest(".questionDiv").show();
		$("input").val("");
		$(".modals").fadeOut();
		$(".modalContent").fadeOut();
	};

	function increaseQuestion(){
		if (currentQuestion !== 10){
			$("#q" + currentQuestion).closest(".questionDiv").hide("drop", {direction:"left", distance: 75}, function(){
				$("#q" + (currentQuestion + 1)).closest(".questionDiv").show("drop", {direction:"right", distance: 75});
				currentQuestion += 1;
			});
			
		}

		else {
			$("#q10").closest(".questionDiv").hide("drop", {direction:"left", distance: 75}, function(){
				$(".surveySubmit").show("drop", {direction:"right", distance: 75});
				currentQuestion += 1;
			});
		}
	};

	$("select").change(function(){
		if ($(this).val() !== "Select Your Answer"){
			increaseQuestion();
		}
	});

	$(".glyphicon").on("click", function(){
		console.log(currentQuestion);
		if (currentQuestion !== 1 && currentQuestion < 11){
			$("#q" + currentQuestion).closest(".questionDiv").hide("drop", {direction:"right", distance: 75}, function(){
				$("#q1").val("Select Your Answer");
				$("#q1").closest(".questionDiv").show("drop", {direction:"left", distance: 75});
				currentQuestion = 1;
				resetQuiz();
			});
		}

		else if (currentQuestion === 11){
			$(".surveySubmit").hide("drop", {direction:"right"}, function(){
				$("#q1").val("Select Your Answer");
				$("#q1").closest(".questionDiv").show("drop", {direction:"left"});
				currentQuestion = 1;
				resetQuiz();
			});
		}
	});

	function resetQuiz(){
		$(".quizSelect").val("Select Your Answer");
		currentQuestion = 1;
	}

});