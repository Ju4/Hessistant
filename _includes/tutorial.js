<script>

  function selectRadioButtons() {
    {% for question in site.data.questions %}
      var matches = /{{ question.id }}=([^&#=]*)/.exec(window.location.search);
      if (matches && matches.length>1){
        document.querySelector(`input[id="${matches[1]}"]`).checked = true;
      }
    {% endfor %}
  }

  function displayJobs() {
    var selectedAnswers = {};
    var hasMatches = true;

    {% for question in site.data.questions %}
      var matches = /{{ question.id }}=([^&#=]*)/.exec(window.location.search);
      if (matches && matches.length>1){
        selectedAnswers["{{ question.id }}"] = matches[1];
      } else {
        hasMatches = false
      }
    {% endfor %}

	if (!hasMatches) {return;}

    var foundJobs = [];

    {% for job in site.jobs %}
      var jobLabels = {{ job.labels | jsonify }};
      var containsLabels = true;
      for (var question in selectedAnswers) {
      	containsLabels = selectedAnswers[question] !== "" && containsLabels && jobLabels.includes(selectedAnswers[question]);
      }
      if (containsLabels) {
        foundJobs.push(["{{ job.title }}", "{{ job.url }}"]);
      }
    {% endfor %}

	if (foundJobs.length) {
	  var updatedContent = "<p>Voici quelques suggestions de jobs qui pourraient te plaire :</p><ul>";
	  for (var item of foundJobs) {
	    updatedContent += `<li><a href="${item[1]}" alt="${item[0]}">${item[0]}</a></li>`
	  }
	  updatedContent += "</ul>"
	  document.getElementById("foundJobs").innerHTML = updatedContent;
	} else {
      document.getElementById("foundJobs").innerHTML = "<p>Je n'ai rien trouvé pour le moment... sorry!</p>";
	}
	document.getElementById("foundJobs").scrollIntoView();
  }

  selectRadioButtons();
  displayJobs();

</script>