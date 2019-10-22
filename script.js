// Write your JavaScript code here!

window.addEventListener("load", function(){

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event){
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');
      let launchStatus = document.getElementById("launchStatus");
      let corgoStatus = document.getElementById('cargoStatus');
      let fuelStatus = document.getElementById('fuelStatus');
      let faultyItems = document.getElementById("faultyItems");

      if(pilotInput.value === "" || copilotInput.value === "" || fuelInput.value === "" || cargoMassInput.value === ""){
         alert("ALL FIELDS ARE REQUIRED!");
      } else if (isNaN(fuelInput.value) || isNaN(cargoMassInput.value) || !isNaN(pilotInput.value) || !isNaN(copilotInput.value)) {
         alert("PLEASE ENTER VALID ENTRIES!");
      } else {
         faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotInput.value}: Ready`;
         copilotStatus.innerHTML = `Co-Pilot ${copilotInput.value}: Ready`;

         if (fuelInput.value < 10000 && cargoMassInput.value > 10000){
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
            cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
         } else if (fuelInput.value < 10000){
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            fuelStatus.innerHTML = "There is not enough fuel for the journey";
         } else if (cargoMassInput.value > 10000){
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
         } else{
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
         }
      }
      event.preventDefault()
   });
   let json = []
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(responce){
      responce.json().then(function(json){
         let missionTarget = document.getElementById("missionTarget");
         let index = Math.floor(Math.random(json.length)*6);
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
         </ol>
         <img src=${json[index].image}>
         `
      })
   })
});