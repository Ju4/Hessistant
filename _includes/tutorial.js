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
        foundJobs.push(["{{ job.title }}", "{{ job.url }}", "{{ job.one-liner }}"]);
      }
    {% endfor %}

	if (foundJobs.length) {
	  var updatedContent = `<p>Voici quelques suggestions de jobs qui pourraient te plaire :</p><div class="job_list">`;
	  for (var item of foundJobs) {
	    updatedContent += `<a class="box job_item" href="${item[1]}" alt="${item[0]}"><div class="box_label job_label"">${item[0]}</div><div class="box_content job_description"">${item[2]}</div></a>`
	  }
	  updatedContent += "</div>"
	  document.getElementById("foundJobs").innerHTML = updatedContent;
	} else {
      document.getElementById("foundJobs").innerHTML = "<p>Je n'ai rien trouvé pour le moment... sorry!</p>";
	}
	document.getElementById("foundJobs").scrollIntoView();
  }

  selectRadioButtons();
  displayJobs();

</script>