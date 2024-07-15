//? *********************** ! Switching UIs ! ***********************
//* 1.Accesssing the main html elements/containers to use for ui switching
let main_div = document.getElementById("clock_div");
let btn_div = document.getElementById("btn_div");

//? Accessing buttons to use them for ui switching
let clock_btn = document.getElementById("clock_btn");
let stopwatch_btn = document.getElementById("stopwatch_btn");
let timer_btn = document.getElementById("timer_btn");

//* This function receives the button (on which user clicks,for example:stopwatch_btn)
//* as an argument and changes ui the ui according to that.
function change_ui(activeButton) {
  const buttons = [clock_btn, stopwatch_btn, timer_btn];
  buttons.forEach((button) => {
    if (button === activeButton) {
      button.classList.add("bg-black", "text-amber-400");
      button.classList.remove("bg-amber-400", "text-black");
      if (activeButton != clock_btn) {
        if (activeButton === timer_btn) {
          main_div.innerHTML = `<div id="hours" class="text-gray-400 text-4xl sm:text-7xl flex flex-col sm:flex-row items-center sm:space-x-2 w-full">
  <input
    type="number" id="hours_inp" autocomplete="off" oninput="restrictInput(event)" placeholder="00"
    class="w-full sm:w-1/3 h-12 bg-transparent border-y-2 border-y-amber-400 text-center"
  />
  <div>
    <p class="dot text-amber-400 text-xl sm:text-2xl">h</p>
  </div>
</div>

<div id="mins" class="text-amber-400 text-4xl sm:text-7xl flex flex-col sm:flex-row items-center sm:space-x-2 w-full">
  <input
    type="number" id="mins_inp" autocomplete="off" oninput="restrictInput(event)" placeholder="00"
    class="w-full sm:w-1/3 h-12 bg-transparent border-y-2 border-y-amber-400 text-center"
  />
  <div>
    <p class="dot text-amber-400 text-xl sm:text-2xl">m</p>
  </div>
</div>

<div id="secs" class="text-white text-4xl sm:text-7xl flex flex-col sm:flex-row items-center sm:space-x-2 w-full">
  <input
    type="number" id="secs_inp" autocomplete="off" oninput="restrictInput(event)" placeholder="00"
    class="w-full sm:w-1/3 h-12 bg-transparent border-y-2 border-y-amber-400 text-center"
  />
  <div>
    <p class="dot text-amber-400 text-xl sm:text-2xl">s</p>
  </div>
</div>
`;
        } else {
          main_div.innerHTML = `
          <div id="mins" class="text-gray-400 sm:text-7xl text-4xl"><p>00</p></div>
          <div><p class="dot text-amber-400 text-2xl">:</p></div>
          <div id="secs" class="text-amber-400 sm:text-7xl text-4xl"><p>00</p></div>
          <div><p class="dot text-amber-400 text-2xl">:</p></div>
          <div id="millis" class="text-white sm:text-7xl text-4xl"><p>00</p></div>`;
        }
        btn_div.innerHTML = `<div id="reset_div" class="bg-black rounded-full px-4 py-2">
  <button id="reset_btn">
    <i class="fa-solid fa-rotate-right fa-flip-horizontal fa-xs" style="color: #000000"></i>
  </button>
</div>

<div id="start_div">
  <button
    id="start_btn"
    class="bg-amber-400 rounded-full px-6 py-2 sm:px-16 sm:py-2 mx-8"
  >
    <i
      id="start_icon"
      class="fa-solid fa-play fa-xs"
      style="color: #000000"
    ></i>
  </button>
</div>

<div id="lap_div" class="bg-black rounded-full px-4 py-2">
  <button id="lap_btn">
    <i class="fa-solid fa-stopwatch fa-xs" style="color: #000000"></i>
  </button>
</div>
                                            `;

        btn_div.classList.remove("flex-col");
        btn_div.classList.replace("justify-around", "justify-center");
      } else {
        main_div.innerHTML = `<div id="hours" class="text-white sm:text-7xl text-4xl"><p></p></div>
      <div><p class="dot text-amber-400 text-2xl">:</p></div>
      <div id="mins" class="text-gray-400 sm:text-7xl text-4xl"><p></p></div>
      <div><p class="dot text-amber-400 text-2xl">:</p></div>
      <div id="secs" class="text-amber-400 text-4xl sm:text-7xl"><p></p></div>`;
        btn_div.innerHTML = `<div id="date_div" class="h-2/4 w-full flex justify-around items-center !text-4xl !sm:text-7xl">
        <div class="text-amber-400 w-1/3 text-center"><p id="date_p"></p></div>
        <div class="text-amber-400 w-1/3 text-center"><p id="month_p"></p></div>
        <div class="text-amber-400 w-1/3 text-center"><p id="year_p"></p></div>
        </div>

        <div id="day_div" class="h-1/4 w-full text-center">
          <p id="day_p" class="text-amber-400 !sm:text-4xl !text-xl tracking-widest"></p>
        </div>`;

        btn_div.classList.add("flex-col");
        btn_div.classList.replace("justify-center", "justify-around");
      }
    } else {
      button.classList.remove("bg-black", "text-amber-400");
      button.classList.add("bg-amber-400", "text-black");
    }
  });
}

//? ************************** ! Clock Code ! **************************
//? Variables For Clock
//* 1.Using date object to get different data values such as date,month etc,
//* storing them in variables and declaring some other variables to use in clock's logic
let main_date = new Date();
let clock_hours = main_date.getHours();
let clock_mins = main_date.getMinutes();
let clock_secs = main_date.getSeconds();
let clock_date = main_date.getDate();
let clock_month = main_date.getMonth();
let clock_year = main_date.getFullYear();
let clock_day = main_date.getDay();
let watch_interval;
let array_months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let array_days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//? The main clock function:
function clock() {
  //* Accessing html elements to display values
  let hours_html = document.getElementById("hours");
  let mins_html = document.getElementById("mins");
  let secs_html = document.getElementById("secs");
  let date_html = document.getElementById("date_p");
  let month_html = document.getElementById("month_p");
  let year_html = document.getElementById("year_p");
  let day_html = document.getElementById("day_p");

  date_html.innerText = clock_date;
  month_html.innerText = array_months[clock_month];
  year_html.innerText = clock_year;
  day_html.innerText = array_days[clock_day];
  watch_interval = setInterval(function () {
    clock_secs++;
    clock_secs = clock_secs === 60 ? (clock_mins++, 0) : clock_secs;
    clock_mins = clock_mins === 60 ? (clock_hours++, 0) : clock_mins;
    clock_hours = clock_hours === 24 ? 0 : clock_hours;
    hours_html.innerText =
      clock_hours > 12
        ? clock_hours - 12 < 10
          ? "0" + (clock_hours - 12)
          : clock_hours - 12
        : clock_hours < 10
        ? "0" + clock_hours
        : clock_hours;
    mins_html.innerText = clock_mins < 10 ? "0" + clock_mins : clock_mins;
    secs_html.innerText = clock_secs < 10 ? "0" + clock_secs : clock_secs;
  }, 1000);
}
//? Calling clock function so that it runs automatically
clock();

//? ******** ! Clock UI ! ********
//* When user switches from default clock ui to another ui and then switches back
//* to clock ui,this function performs the job to switch the ui back to clock ui
function clock_ui() {
  console.log("Switched to clock ui");
  change_ui(clock_btn);
  clearInterval(watch_interval);
  clock();
}

//? ************************** ! StopWatch Code ! **************************
//* 1.Declaring variables to use in stopwatch functionality
let mins = 0;
let secs = 0;
let millis = 0;

//? Function to change the ui to stopwatch-ui
function stopwatch_ui() {
  console.log("Switched to stopwatch ui");
  change_ui(stopwatch_btn);

  //* Accessing buttons to start,stop & reset stopwatch
  let start_btn = document.getElementById("start_btn");
  let reset_btn = document.getElementById("reset_btn");
  let lap_btn = document.getElementById("start_btn");

  //* Adding event listeners on buttons to perform start,stop & reset functions
  start_btn.addEventListener("click", start);
  reset_btn.addEventListener("click", reset);

  //* Accessing other important html elements to display data
  let reset_div = document.getElementById("reset_div");
  let lap_div = document.getElementById("lap_div");
  let start_icon = document.getElementById("start_icon");
  let mins_html = document.getElementById("mins");
  let secs_html = document.getElementById("secs");
  let millis_html = document.getElementById("millis");

  // ? Helper function to reduce unnecessary code repitition.
  function helper(state) {
    function common_code() {
      start_btn.removeEventListener("click", pause);
      start_btn.addEventListener("click", start);
      start_icon.classList.replace("fa-pause", "fa-play");
      lap_div.classList.replace("bg-amber-400", "bg-black");
    }
    switch (state) {
      case "start":
        start_btn.removeEventListener("click", start);
        start_btn.addEventListener("click", pause);
        start_icon.classList.replace("fa-play", "fa-pause");
        lap_div.classList.replace("bg-black", "bg-amber-400");
        reset_div.classList.replace("bg-black", "bg-amber-400");
        break;
      case "pause":
        common_code();
        break;
      case "reset":
        common_code();
        reset_div.classList.replace("bg-amber-400", "bg-black");
        break;
    }
  }

  //? The 3 main stopwatch functions
  function start() {
    console.log("StopWatch Started");
    helper("start");
    watch_interval = setInterval(function () {
      millis++;
      if (millis >= 99) {
        secs++;
        millis = 0;
      }
      if (secs >= 59) {
        mins++;
        secs = 0;
      }
      millis_html.innerText = millis;
      secs_html.innerText = secs < 10 ? "0" + secs : secs;
      mins_html.innerText = mins < 10 ? "0" + mins : mins;
    }, 10);
  }
  function pause() {
    console.log("StopWatch Paused");
    helper("pause");
    clearInterval(watch_interval);
  }
  function reset() {
    console.log("StopWatch Reset");
    helper("reset");
    clearInterval(watch_interval);
    millis = 0;
    millis_html.innerText = "0" + millis;
    secs = 0;
    secs_html.innerText = "0" + secs;
    mins = 0;
    mins_html.innerText = "0" + mins;
  }
}

//? ************************** ! Timer Code ! **************************
//? Function to change the ui to timer-ui
function timer_ui() {
  console.log("Switched to timer ui");
  change_ui(timer_btn);

  //* Accessing start button and adding event listener to call timer functon onclick
  let start_btn = document.getElementById("start_btn");
  start_btn.addEventListener("click", timer);
}

//? This function performs 3 jobs
// * 1.Restricts user from entering 3 digit values so the max possible input would be 99
// * 2.If user enters 1 digit values, adds a zero before it. For example, 1 => 01)
// * 3.Restricts any special characters, thus user can only input possitive integers
function restrictInput(event) {
  const input = event.target;
  const value = input.value;
  input.value = input.value.replace(/[^0-9]/g, "");

  if (value.length < 2 && value.length > 0) {
    input.value = "0" + value;
  } else if (value.length > 2) {
    input.value = value.slice(1, 3);
  }
}

//? The main timer function which starts the timer
function timer() {
  //! Note:To fast forward the timer,decrease the interval in secs and mins function.
  //* Variables to save user's input values and use them to manage intervals
  //* and difference between hours, minutes and seconds.
  let start_icon = document.getElementById("start_icon");
  let reset_btn = document.getElementById("reset_btn");
  let hours_input = document.getElementById("hours_inp");
  let mins_input = document.getElementById("mins_inp");
  let secs_input = document.getElementById("secs_inp");
  let timer_hours = parseInt(hours_input.value) || 0;
  let timer_mins = parseInt(mins_input.value) || 0;
  let timer_secs = parseInt(secs_input.value) || 0;
  let array_inp = [hours_input, mins_input, secs_input];
  let timer_interval;

  //* Indicate the state of timer, either it has been started or stopped and log
  //* input values to console when timer starts
  function listener(state) {
    let names = ["Hours", "Minutes", "Seconds"];
    if (state === "start") {
      console.log("Timer Started");
      for (let i = 0; i < array_inp.length; i++) {
        console.log(names[i] + " => " + array_inp[i].value);
        array_inp[i].readOnly = true;
      }
    } else if (state === "stop") {
      console.log("Timer Stopped");
      for (let i = 0; i < array_inp.length; i++) {
        console.log(names[i] + "=>" + array_inp[i].value);
        array_inp[i].readOnly = false;
      }
    }
  }

  //* Changes ui and shows popups to show any error or finishing of timer
  function ui_changes(todo) {
    if (todo === "start") {
      start_icon.classList.replace("fa-play", "fa-pause");
      start_btn.removeEventListener("click", timer);
      start_btn.addEventListener("click", pause_timer);
      reset_btn.addEventListener("click", reset_timer);
      reset_div.classList.replace("bg-black", "bg-amber-400");
    } else if (todo === "dontStart" || "stop") {
      if (todo === "dontStart") {
        main_div.innerHTML = `
      <div id="popup_div"
        class="h-full w-96 border-2 border-amber-400 rounded-lg bg-black flex flex-col justify-center items-center animate__animated  animate__slow animate__zoomIn">
      <div class="mx-auto mb-10">  
        <p class="text-3xl text-amber-400">Please Enter A Valid Time.</p>
      </div>

      <div class="mb-8">
         <button id="okay_btn"  class="bg-black border-2 border-amber-400 text-amber-400 text-2xl rounded-lg ">Okay</button>
      </div>
      </div>`;
      } else {
        main_div.innerHTML = `
      <div id="popup_div"
        class="h-full w-96 border-2 border-amber-400 rounded-lg bg-black flex flex-col justify-center items-center animate__animated  animate__slow animate__zoomIn">
      <div class="mx-auto mb-10">  
        <p class="text-3xl text-amber-400">Timer Finished.</p>
      </div>

      <div class="mb-8">
         <button id="okay_btn"  class="bg-black border-2 border-amber-400 text-amber-400 text-2xl rounded-lg ">Okay</button>
      </div>
      </div>`;
        start_icon.classList.replace("fa-pause", "fa-play");
      }

      let popup_div = document.getElementById("popup_div");
      let okay_btn = document.getElementById("okay_btn");
      okay_btn.addEventListener("click", close_popup);
      function close_popup() {
        popup_div.classList.replace("animate__zoomIn", "animate__zoomOut");
        popup_div.classList.replace("animate__slow", "animate__slower");
        let popup_interval;
        let duration = 0;
        popup_interval = setInterval(() => {
          duration++;
          if (duration === 1) {
            timer_ui();
            duration = 0;
            clearInterval(popup_interval);
          }
        }, 1000);
      }
    }
  }

  //? Declaring functions to use for all possible values that user can enter.
  //? These functions further consist of two types:
  //* 1.Main function; which contains the main logic for a particular possible input.
  //* 2.Sub-Function; which is declared to be used in main function to reduce code repetition.

  //? 1.Seconds
  //* Sub-Functions
  function start_sec() {
    timer_secs--;
    if (timer_secs < 10) {
      secs_input.value = "0" + timer_secs;
    } else {
      secs_input.value = timer_secs;
    }
  }
  function secs_into_mins() {
    timer_secs -= 60;
    timer_mins += 1;
    mins_input.value = timer_mins;
  }
  //* Main function
  function secs(use) {
    timer_interval = setInterval(function () {
      start_sec();
      if (timer_secs === 0) {
        switch (use) {
          case "for_secs":
            clearInterval(timer_interval);
            break;
          case "for_mins":
            clearInterval(timer_interval);
            break;
          case "for_mins_secs":
            clearInterval(timer_interval);
            mins("for_mins");
            break;
          case "for_hours":
            clearInterval(timer_interval);
            hours();
            break;
          case "for_hours_mins_secs":
            clearInterval(timer_interval);
            hours_mins();
            break;
        }

        //* Checks if all the values have become zero then shows a timer finished popup
        if (timer_hours === 0 && timer_mins === 0) {
          console.log("Timer Finished");
          ui_changes("stop");
        }
      }
    }, 1000);
  }

  //? 2.Minutes
  //* Sub-Functions
  function start_mins() {
    timer_mins--;
    if (timer_mins < 10) {
      mins_input.value = "0" + timer_mins;
    } else {
      mins_input.value = timer_mins;
    }
    timer_secs = 60;
  }
  function mins_into_hours() {
    timer_mins -= 60;
    timer_hours += 1;
    hours_input.value = timer_hours;
  }
  function one_min(use) {
    start_mins();
    switch (use) {
      case "for_mins":
        secs("for_mins");
        break;
      case "for_hours":
        secs("for_hours");
        break;
    }
  }
  function continue_mins(use) {
    if (timer_mins > 1) {
      start_mins();
    } else if (timer_mins === 1) {
      clearInterval(timer_interval);
      switch (use) {
        case "for_mins":
          one_min("for_mins");
          break;
        case "for_hours":
          one_min("for_hours");
          break;
      }
    }
  }

  //* Main functions
  function mins(use) {
    start_mins();
    timer_interval = setInterval(function () {
      start_sec();
      if (timer_secs === 0) {
        switch (use) {
          case "for_mins":
            continue_mins("for_mins");
            break;
          case "for_hours":
            continue_mins("for_hours");
            break;
        }
      }
    }, 1000);
  }
  function mins_secs() {
    if (timer_secs > 60) {
      secs_into_mins();
      secs("for_mins_secs");
    } else if (timer_secs <= 60) {
      secs("for_mins_secs");
    }
  }

  //? 3.Hours
  //* Sub-Functions
  function start_hours() {
    timer_hours--;
    if (timer_hours < 10) {
      hours_input.value = "0" + timer_hours;
    } else {
      hours_input.value = timer_hours;
    }
    timer_mins = 60;
  }

  //* Main functions
  function hours() {
    if (timer_hours > 1) {
      start_hours();
      mins("for_hours");
    } else if (timer_hours === 1) {
      clearInterval(timer_interval);
      start_hours();
      mins("for_hours");
    }
  }
  function hours_mins() {
    if (timer_mins > 60) {
      mins_into_hours();
      mins("for_hours");
    } else if (timer_mins <= 60) {
      mins("for_hours");
    }
  }
  function hours_mins_secs() {
    if (timer_secs > 60) {
      secs_into_mins();
      if (timer_mins > 60) {
        mins_into_hours();
        secs("for_hours_mins_secs");
      } else if (timer_mins <= 60) {
        secs("for_hours_mins_secs");
      }
    } else if (timer_secs <= 60) {
      if (timer_mins > 60) {
        mins_into_hours();
        secs("for_hours_mins_secs");
      } else if (timer_mins <= 60) {
        secs("for_hours_mins_secs");
      }
    }
  }

  // TODO: Using if-else statements to call functions according to different conditions
  if (timer_hours > 0 || timer_mins > 0 || timer_secs > 0) {
    //* Calling listener function to indicate state
    listener("start");
    //* Calling a function that changes button icon to indicate that timer has started
    ui_changes("start");

    // TODO: If User Enters Only Seconds
    if (timer_secs > 0 && timer_hours === 0 && timer_mins === 0) {
      secs("for_secs");
    }

    // TODO: If User Enters Only Minutes
    else if (timer_mins > 0 && timer_secs === 0 && timer_hours === 0) {
      // TODO If User Enters Only One Minute
      if (timer_mins === 1 && timer_secs === 0) {
        one_min("for_mins");
      }
      // TODO If User Enters More Than One Minutes
      else if (timer_mins > 1 && timer_secs === 0) {
        mins("for_mins");
      }
    }

    // TODO: If User Enters Only Hours
    else if (timer_hours > 0 && timer_mins === 0 && timer_secs === 0) {
      hours();
    }

    // TODO If User Enters Minutes And Seconds
    else if (timer_mins > 0 && timer_secs > 0 && timer_hours === 0) {
      mins_secs();
    }

    // TODO If User Enters Hours And Minutes
    else if (timer_hours > 0 && timer_mins > 0 && timer_secs === 0) {
      hours_mins();
    }

    // TODO If User Enters Hours,Minutes And Seconds
    else if (timer_hours > 0 && timer_mins > 0 && timer_secs > 0) {
      hours_mins_secs();
    }
  }
  // TODO: Show error if user does not give any input
  else if (timer_hours === 0 && timer_mins === 0 && timer_secs === 0) {
    ui_changes("dontStart");
  }

  // ? Function to pause timer
  function pause_timer() {
    start_btn.removeEventListener("click", pause_timer);
    start_btn.addEventListener("click", timer);
    start_icon.classList.replace("fa-pause", "fa-play");
    clearInterval(timer_interval);
  }

  //? Function to reset timer
  function reset_timer() {
    console.log("Timer Reset");
    timer_ui();
  }
}
