//<div id="showWelcomeMessagebtn" class="absolute hidden flex cursor-pointer bottom-[4.5rem] space-y-2 bg-white flex-col text-gray-800 shadow-lg right-4 w-[90%] px-4 py-2 sm:w-full h-fit rounded-xl sm:max-w-[280px] z-[99999]">
//  <div  class="flex items-center space-x-2">
//    <img id="company-logo" alt="company logo" class="w-[25px] h-[25px] rounded-full object-cover" />
//    <label id="company-name" class="w-full cursor-pointer font-bold text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"></label>
//    <button id="showWelcomeMessagebtnClose"
//      type="button"
//    >
//    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x text-gray-500"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
//    </button>
//  </div>
//  <p id="welcomeMessageLabel" class="text-sm">dsadsadsad</p>
//</div>

const ui = `
<div class="chatui scale-0 absolute bottom-16 py-2 origin-bottom-right transition-all duration-200 sm:right-4 px-4 sm:px-0 w-full h-[80vh] rounded-xl sm:max-w-[400px] z-[99999]">
  <div class="max-w-full w-full bg-transparent justify-end h-full items-end flex flex-col space-y-4 right-0">
    <div class="h-full bg-white flex flex-col rounded-2xl overflow-hidden w-full">
      <div class="accent-color-elem relative rounded-t-2xl flex items-center justify-start w-full h-fit p-4 py-6">
        <div class="flex items-center justify-center space-x-3">
          <img id="company-logo" alt="company logo" class="w-10 h-10 invert rounded-full object-cover" />
          <div class="flex flex-col">
            <label id="company-name" class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-white text-lg leading-5 capitalize"></label>
            <label id="company-subheading" class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize text-white/80 text-xs leading-5"></label>
          </div>
        </div>
      </div>
      <div class="flex flex-col overflow-hidden w-full h-full">
        <div class="w-full h-full bg-white flex items-center justify-center overflow-hidden">
          <div id="messages-list" class="w-full h-full flex flex-col overflow-y-scroll scrollbar-hide"></div>
        </div>

        <div class="flex flex-col w-full h-fit">
          <div id="faqButtons" class="p-2 flex items-center space-x-2 w-full h-fit overflow-scroll scrollbar-hide">
          </div>
      </div>

        <div class="border-t"></div>
        <form class="flex items-center">
          <textarea class="flex w-full text-sm rounded-md border-input bg-background px-3 py-2 ring-offset-background resize-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-12 scrollbar-hide focus-visible:ring-0 focus-visible:ring-offset-0 border-0" id="userInput" value="" name="userInput" ></textarea>
          <button type="submit" id="send" class="text-gray-400 relative h-full min-w-[30px] flex items-center justify-start">
            <svg viewBox="0 0 20 20" id="accent-color-elem2" class="rotate-90 w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
<button id="toggleButtonOpen" class="accent-color-elem transition-all text-white z-[99999999] rounded-full absolute bottom-4 right-4 p-2 h-fit scale-90 focus:transf transition-all hover:scale-100">
<div class="show-hide-btn">
<div class="show" id="chat-bubble-icon-div">
  <img id="chat-bubble-icon" alt="chat bubble icon" class="w-8 h-8 invert" />
</div>
<div class="hide2">
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="p-1 w-8 h-8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
</div>
</div>
</button>`;

const tailwindScript = document.createElement("script");
tailwindScript.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwindScript);

document.addEventListener("DOMContentLoaded", async function () {
  const styleElem = document.createElement("style");
  styleElem.innerHTML = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .show {
    user-select: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: fit-content;
    transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  
  .hide {
    user-select: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: fit-content;
    transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
    opacity: 0;
    transform: rotate(30deg) scale(0);
  }
  
  .hide2 {
    user-select: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
    opacity: 0;
    transform: rotate(-60deg);
  }
  
  .show2 {
    user-select: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    transition: transform 0.16s linear 0s, opacity 0.08s linear 0s;
    opacity: 1;
    transform: rotate(0deg);
  }
  
  .show-hide-btn {
    position: relative;
    width: 32px;
    height: 32px;
    cursor: pointer;
    overflow: hidden;
    border-radius: 50%;
    backface-visibility: hidden;
  }
  `;

  document.body.appendChild(styleElem);

  const div = document.createElement("div");
  div.innerHTML = ui;
  document.body.appendChild(div);

  let show = true;
  let messages = [];
  // let showWelcomeMessage = false;
  // DOM elements
  const toggleButtonOpen = document.getElementById("toggleButtonOpen");
  const userInputField = document.getElementById("userInput");
  const sendButton = document.getElementById("send"); // Add this line

  // Initially hide the send button
  sendButton.style.display = "none";

  // Event listener for user input
  userInputField.addEventListener("input", function () {
    // Show the send button if there is input, hide it otherwise
    sendButton.style.display =
      userInputField.value.trim() !== "" ? "block" : "none";
  });

  // Event listener for Enter key press in the textarea
  userInputField.addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13 && !event.shiftKey) {
      // Prevent the default Enter key behavior (usually adding a newline)
      event.preventDefault();

      // Trigger the form submission
      form.dispatchEvent(new Event("submit"));
    }
  });

  const messages_list = document.getElementById("messages-list");

  let messagesId = JSON.parse(sessionStorage.getItem("messagesId")) || null;

  const fetch_initial = await fetch("https://chatbot-server-2668.vercel.app/api/fetch-chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: token,
      messagesId: messagesId
    })
  });

  const chatbotUI = await fetch_initial.json();

  sessionStorage.setItem("messagesId", JSON.stringify(chatbotUI.messagesId));
  messagesId = chatbotUI?.messagesId;

  // console.log(chatbotUI);

  // Function to scroll to the bottom of the div
  function scrollToBottom() {
    if (messages_list) {
      messages_list.scrollTop = messages_list.scrollHeight;
    }
  }

  const handleFaqSubmit = async (query) => {
    // Convert faqContainer.children to an array using spread operator
    const faqArray = [...faqContainer.children];

    messages_list.innerHTML += message_template({
      role: "user",
      content: query
    });

    messages.push({
      role: "user",
      content: query
    });

    // Scroll to the bottom after updating messages
    scrollToBottom();

    messages_list.innerHTML += message_template({
      role: "assistant",
      content: null
    });
    scrollToBottom();

    // Clear the input field
    userInputField.value = "";
    userInputField.disabled = true;
    document.getElementById("send").disabled = true;
    sendButton.style.display = "none";
    // Disable buttons using forEach on the array
    faqArray.forEach((btn) => {
      btn.disabled = true;
    });

    const response = await fetch("https://chatbot-server-2668.vercel.app/api/get-bot-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messagesId,
        messages: messages.map((message) => {
          const { role, content } = message;
          return { role, content };
        }),
        chatbotId: chatbotUI._id,
        query
      })
    });
    if (!response.body) return;
    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let result = "";
    count = 0;
    while (true) {
      var { value, done } = await reader.read();
      if (done) {
        count = 0;
        break;
      }

      count++;
      if (count === 1) document.getElementById("remove").remove();

      messages_list.lastElementChild.lastElementChild.lastElementChild.innerHTML +=
        value;

      result += value;
      scrollToBottom();
    }

    messages.push({
      role: "assistant",
      content: result
    });

    // console.log(messages);

    // Scroll to the bottom after updating messages
    userInputField.placeholder = chatbotUI?.input_box_placeholder;
    userInputField.disabled = false;
    userInputField.focus();
    document.getElementById("send").disabled = false;
    // Disable buttons using forEach on the array
    faqArray.forEach((btn) => {
      btn.disabled = false;
    });

    // if (
    //   !bot_message.follow_up_questions ||
    //   bot_message.follow_up_questions === "" ||
    //   bot_message.follow_up_questions === undefined
    // ) {
    //   return;
    // }

    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // messages_list.innerHTML += message_template({
    //   role: bot_message?.role,
    //   content: bot_message?.follow_up_questions
    // });
    scrollToBottom();
  };

  // Assuming chatbotUI and handleFaqSubmit are defined elsewhere
  let faqs = chatbotUI && chatbotUI.faqs ? chatbotUI.faqs : [];

  let faqContainer = document.getElementById("faqButtons");

  faqs.forEach(function (faq) {
    let button = document.createElement("button");
    button.type = "button";
    button.textContent = faq.question;

    button.addEventListener("click", function () {
      handleFaqSubmit(faq.question);
    });

    button.className =
      "text-[0.7rem] cursor-pointer rounded-xl disabled:cursor-not-allowed disabled:opacity-60 text-gray-400 hover:text-[var(--main-color)] border hover:border-[var(--main-color)] transition-all px-2 py-1 w-fit h-fit whitespace-nowrap";
    faqContainer.appendChild(button);
  });

  document.querySelectorAll("#company-logo").forEach((elem) => {
    elem.src = chatbotUI?.company_logo;
  });

  document.querySelectorAll("#company-name").forEach((elem) => {
    elem.textContent = chatbotUI?.company_name;
  });

  document.getElementById("company-subheading").textContent =
    chatbotUI?.subheading;
  document.getElementById("accent-color-elem2").style.fill =
    chatbotUI?.accent_colour;
  document.getElementById("chat-bubble-icon").src = chatbotUI?.chat_bubble_icon;
  // document.getElementById("welcomeMessageLabel").textContent =
  //   chatbotUI?.welcome_message;
  userInputField.placeholder = chatbotUI?.input_box_placeholder;
  const accentColorElements = document.querySelectorAll(".accent-color-elem");
  styleElem.innerHTML += `
    :root {
      --main-color: ${chatbotUI?.accent_colour}
    }
    `;

  // showWelcomeMessage = chatbotUI?.show_floating_welcome_message;

  // Iterate over each element in the NodeList
  accentColorElements.forEach((element) => {
    // Apply the background color from chatbotUI.accent_color
    element.style.background = chatbotUI?.accent_colour;
  });

  // Further processing based on the response

  function message_template(object) {
    if (object?.role === "assistant") {
      return `
          <div class="relative p-4 flex space-x-1 items-start justify-start">
          <div class="p-1 mt-1.5 border border-black rounded-full min-w-fit">
              <img id="chat-bubble-icon" src=${
                chatbotUI?.chat_bubble_icon
              } alt="chat bubble icon" class="w-3 h-3" />
            </div>
            <div class="text-sm p-2 px-2 bg-gray-100 shadow-md max-w-[250px] rounded-xl">
            <p>${
              object?.content === null
                ? `<div id="remove" class="flex flex-row space-x-1">
            <div
            class="w-1.5 h-1.5 bg-[${chatbotUI?.accent_colour}]  rounded-full animate-bounce [animation-delay:.7s]"
            ></div>
            <div
            class="w-1.5 h-1.5 bg-[${chatbotUI?.accent_colour}] rounded-full animate-bounce [animation-delay:.3s]"
            ></div>
            <div
              class="w-1.5 h-1.5 bg-[${chatbotUI?.accent_colour}]  rounded-full animate-bounce [animation-delay:.7s]"
              ></div>
              </div>`
                : object?.content
            }</p>
            </div>
            </div>
            `;
    } else {
      return `
          <div class="relative p-4 flex space-x-1 items-start justify-end">
            <div class="text-sm bg-[${chatbotUI?.accent_colour}] text-white p-2 px-2  shadow-md max-w-[250px] rounded-xl">
            <p>${object?.content}</p>
            </div>
            <div class="p-1 mt-1.5 border border-[${chatbotUI?.accent_colour}] text-[${chatbotUI?.accent_colour}] rounded-full">
              <svg
              stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                class="text-xs"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            </div>
            `;
    }
  }

  messages_list.innerHTML = message_template({
    content: chatbotUI?.welcome_message,
    role: "assistant"
  });

  if (chatbotUI && chatbotUI.messages && chatbotUI.messages.length !== 0) {
    // Ensure that chatbotUI.messages is an array before attempting to sort
    if (Array.isArray(chatbotUI.messages)) {
      const messages = chatbotUI.messages.sort(
        (a, b) => b?.createdAt - a?.createdAt
      );

      for (let message of messages) {
        const { role, content } = message;
        messages_list.innerHTML += message_template({
          role: role,
          content: content
        });
      }
    }
  }

  // const showWelcomeMessagebtn = document.getElementById(
  //   "showWelcomeMessagebtn"
  // );

  // const showWelcomeMessagebtnClose = document.getElementById(
  //   "showWelcomeMessagebtnClose"
  // );

  // Toggle button click event
  toggleButtonOpen.addEventListener("click", function () {
    // Toggle the visibility of the chat UI
    const chatUI = document.querySelector(".chatui");
    userInputField.focus();
    if (chatbotUI?.messages?.length !== 0) scrollToBottom();

    if (show) {
      chatUI.classList.replace("scale-0", "scale-100");
      document.querySelector(".show").classList.replace("show", "hide");
      document.querySelector(".hide2").classList.replace("hide2", "show2");
      // showWelcomeMessagebtn.classList.replace("flex", "hidden");
      show = false;
    } else {
      chatUI.classList.replace("scale-100", "scale-0");
      document.querySelector(".hide").classList.replace("hide", "show");
      document.querySelector(".show2").classList.replace("show2", "hide2");
      // showWelcomeMessagebtn.classList.replace("hidden", "flex");
      show = true;
    }
  });

  // if (showWelcomeMessage) {
  //   setTimeout(() => {
  //     showWelcomeMessagebtn.classList.replace("hidden", "flex");
  //   }, 10000);
  // }
  // // Toggle button click event
  // showWelcomeMessagebtn.addEventListener("click", () =>
  //   toggleButtonOpen.click()
  // );

  // showWelcomeMessagebtnClose.addEventListener("click", (e) => {
  //   e.stopPropagation(); // This prevents the click event from reaching the parent div
  //   showWelcomeMessagebtn.remove();
  // });

  // Form submit event
  const form = document.querySelector("form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Convert faqContainer.children to an array using spread operator
    const faqArray = [...faqContainer.children];

    // Get user input
    const userInput = userInputField.value;

    const question = userInput.trim();
    // Hide the send button on form submission

    if (question === "" || !question) return;

    messages_list.innerHTML += message_template({
      role: "user",
      content: question
    });

    messages.push({
      role: "user",
      content: question
    });

    // Scroll to the bottom after updating messages
    scrollToBottom();

    messages_list.innerHTML += message_template({
      role: "assistant",
      content: null
    });
    scrollToBottom();

    // Clear the input field
    userInputField.value = "";
    userInputField.disabled = true;
    document.getElementById("send").disabled = true;
    sendButton.style.display = "none";
    // Disable buttons using forEach on the array
    faqArray.forEach((btn) => {
      btn.disabled = true;
    });

    const response = await fetch("https://chatbot-server-2668.vercel.app/api/get-bot-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messagesId,
        messages: messages.map((message) => {
          const { role, content } = message;
          return { role, content };
        }),
        chatbotId: chatbotUI._id,
        query: question
      })
    });
    if (!response.body) return;
    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    let result = "";
    count = 0;
    while (true) {
      var { value, done } = await reader.read();
      if (done) {
        count = 0;
        break;
      }

      count++;
      if (count === 1) document.getElementById("remove").remove();

      messages_list.lastElementChild.lastElementChild.lastElementChild.innerHTML +=
        value;

      result += value;
      scrollToBottom();
    }

    messages.push({
      role: "assistant",
      content: result
    });

    // console.log(messages);

    // Scroll to the bottom after updating messages
    userInputField.placeholder = chatbotUI?.input_box_placeholder;
    userInputField.disabled = false;
    userInputField.focus();
    document.getElementById("send").disabled = false;
    // Disable buttons using forEach on the array
    faqArray.forEach((btn) => {
      btn.disabled = false;
    });

    // if (
    //   !bot_message.follow_up_questions ||
    //   bot_message.follow_up_questions === "" ||
    //   bot_message.follow_up_questions === undefined
    // ) {
    //   return;
    // }

    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // messages_list.innerHTML += message_template({
    //   role: bot_message?.role,
    //   content: bot_message?.follow_up_questions
    // });
    scrollToBottom();
  });
});
