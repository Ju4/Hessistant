<script>
  function findJobs() {
    var selectedAnswers = {};

    {% for question in site.data.questions %}
      selectedAnswers["{{ question.id }}"] = document.getElementsByName("question-{{ question.id }}")[0].value;
    {% endfor %}

    var foundJobs = "Je n'ai rien trouvé pour le moment... sorry!";

    {% for job in site.jobs %}
      var jobLabels = {{ job.labels | jsonify }};
      var containsLabels = true;
      for (var question in selectedAnswers) {
      	containsLabels = selectedAnswers[question] !== "" && containsLabels && jobLabels.includes(selectedAnswers[question]);
      }
      if (containsLabels) {
        foundJobs = "{{ job.title }}";
      }
    {% endfor %}

    document.getElementById("foundJobs").textContent = foundJobs;
  }
</script>