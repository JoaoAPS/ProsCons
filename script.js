$("document").ready(() => {
  //----- Functions declarations -----
  function liMouseEnter() {
    $(this).append(
      $("<span></span>")
        .text("X")
        .addClass("remove-icon")
        .click(() => $(this).remove())
    )
  }

  function liMouseLeave() {
    $(this).children("span").remove()
  }

  function newli(liText) {
    return $("<li></li>")
      .text(liText)
      .attr("contenteditable", "true")
      .mouseenter(liMouseEnter)
      .mouseleave(liMouseLeave)
  }

  // Code modified from https://ourcodeworld.com/
  function downloadJSON(filename, object) {
    var element = document.createElement("a")
    element.setAttribute(
      "href",
      "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object))
    )
    element.setAttribute("download", filename)
    element.style.display = "none"

    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  function save() {
    const option1 = $("#option1-container").find(".option-title").text()
    const option2 = $("#option2-container").find(".option-title").text()

    const opt1_pros = $("#option1-container")
      .find(".pros-container ol")
      .children("li")
      .toArray()
      .map(x => x.innerText)
    const opt1_cons = $("#option1-container")
      .find(".cons-container ol")
      .children("li")
      .toArray()
      .map(x => x.innerText)
    const opt2_pros = $("#option2-container")
      .find(".pros-container ol")
      .children("li")
      .toArray()
      .map(x => x.innerText)
    const opt2_cons = $("#option2-container")
      .find(".cons-container ol")
      .children("li")
      .toArray()
      .map(x => x.innerText)

    const data = {
      option1,
      option2,
      opt1_pros,
      opt1_cons,
      opt2_pros,
      opt2_cons,
    }

    downloadJSON("pros_cons.json", data)
  }

  function load(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    if (!file.name) return

    reader.addEventListener("load", event => {
      const data = JSON.parse(event.target.result)
      let liVet

      // Titles
      $("#option1-container").find(".option-title").text(data.option1)
      $("#option2-container").find(".option-title").text(data.option2)

      // Option 1 pros
      liVet = $()
      data.opt1_pros.forEach(liText => (liVet = liVet.add(newli(liText))))
      $("#option1-container").find(".pros-container ol").html(liVet)

      // Option 1 cons
      liVet = $()
      data.opt1_cons.forEach(liText => (liVet = liVet.add(newli(liText))))
      $("#option1-container").find(".cons-container ol").html(liVet)

      // Option 2 pros
      liVet = $()
      data.opt2_pros.forEach(liText => (liVet = liVet.add(newli(liText))))
      $("#option2-container").find(".pros-container ol").html(liVet)

      // Option 2 cons
      liVet = $()
      data.opt2_cons.forEach(liText => (liVet = liVet.add(newli(liText))))
      $("#option2-container").find(".cons-container ol").html(liVet)
    })

    reader.readAsText(file)
  }

  //----- Change behaviour -----
  $("form").submit(e => e.preventDefault())

  $("li").mouseenter(liMouseEnter)
  $("li").mouseleave(liMouseLeave)

  $("#clear-icon").click(() => {
    $("#option1-container").find(".pros-container ol").html("")
    $("#option1-container").find(".cons-container ol").html("")
    $("#option2-container").find(".pros-container ol").html("")
    $("#option2-container").find(".cons-container ol").html("")
  })
  $("#save-icon").click(save)
  $("#load-icon").click(() => $("#load-file").click())
  $("#load-file").change(load)

  //---- Event Binding -----
  $(".add-btn").click(function () {
    const newText = $(this).prev("input").val()
    $(this).parent().prev("ol").append(newli(newText))
    $(this).prev("input").val("")
  })
})
