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

// variables
let bot_icon = null;
let creator_logo = null;
let company_name = null;
let welcome_message = null;
let messagesId = null;
let faqs = null;
let starter_questions = null;
let widget_position = null;
let show = false;
let showWelcomeMessage = false;
let showStarterQuestions = false;

function generateShades(mainColorHex) {
  // Convert hex to RGB
  const mainColorRGB = [
    parseInt(mainColorHex.slice(1, 3), 16),
    parseInt(mainColorHex.slice(3, 5), 16),
    parseInt(mainColorHex.slice(5, 7), 16)
  ];

  // Calculate darker shade
  const darkerShadeRGB = mainColorRGB.map((val) => Math.max(0, val - 50));
  const darkerShadeHex = `#${darkerShadeRGB
    .map((val) => val.toString(16).padStart(2, "0"))
    .join("")}`;

  // Calculate lighter shade
  const lighterShadeRGB = mainColorRGB.map((val) => Math.min(255, val + 50));
  const lighterShadeHex = `#${lighterShadeRGB
    .map((val) => val.toString(16).padStart(2, "0"))
    .join("")}`;

  return [darkerShadeHex, lighterShadeHex];
}

function markdownToHTML(markdownString) {
  const converter = new showdown.Converter();
  return converter.makeHtml(markdownString);
}

function getCurrentDateTimeUTC() {
  const currentDate = new Date();

  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getUTCDate()).padStart(2, "0");

  const hours = String(currentDate.getUTCHours()).padStart(2, "0");
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getUTCSeconds()).padStart(2, "0");

  const milliseconds = String(currentDate.getUTCMilliseconds()).padStart(
    3,
    "0"
  );

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function timeDifference(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  const timeDifferenceInSeconds = Math.floor(Math.abs(date2 - date1) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} second${
      timeDifferenceInSeconds !== 1 ? "s" : ""
    } ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 604800) {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    const weeks = Math.floor(timeDifferenceInSeconds / 604800);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

// function message_template(object, isWelcomeMessage = false) {

//   const headingpattern = /(## [^\n\r]+)/;
//   const subheadingpattern = /(### [^\n\r]+)/;
//   const subheading = object.content.split(subheadingpattern).filter((text) => text.includes("###")).toString().replace("### ", "\n").trim();
//   const heading = object.content.split(headingpattern).filter((text) => text.includes("##")).toString().replace("## ", "\n").trim();
//   console.log(subheading);
//   console.log(heading);

//   // sections.forEach((section) => {
//   //   console.log(section.trim());
//   // });

//   if (object?.role === "assistant") {
//     return `
//         <div class="relative p-4 flex space-x-1 items-start justify-start">
//           <div class="p-1 mt-1.5 border border-black rounded-full min-w-fit">
//             <img id="chat-bubble-icon" src=${bot_icon} alt="chat bubble icon" class="w-3 h-3" />
//           </div>
//           <div id="message-contain-div" class="text-sm p-2 px-2 bg-gray-100 shadow-md w-full max-w-fit rounded-xl">
//           ${
//             isWelcomeMessage
//               ? `<div>${object?.content}</div>`
//               : object?.content === null
//               ? `
//                 <div id="remove" class="flex flex-row space-x-1">
//                   <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.7s]"></div>
//                   <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.3s]"></div>
//                   <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.7s]"></div>
//                 </div>`
//               : `<h3 class="${!subheading && "hidden"} text-base font-semibold">${subheading}</h3>
//               <h2 class="${!heading && "hidden"} text-base font-semibold">${heading}</h2>
//               <textarea id="answer" readonly class="flex w-[250px] text-sm rounded-md border-input bg-transparent ring-offset-background resize-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 scrollbar-hide focus-visible:ring-0 focus-visible:ring-offset-0 border-0">${object?.content.replace(subheadingpattern, "\n").replace(headingpattern, "\n")}</textarea>`
//           }
//           </div>
//         </div>
//       `;
//   } else {
//     return `
//         <div class="relative p-4 flex space-x-1 items-start justify-end">
//           <div class="text-sm bg-primary text-white p-2 px-2  shadow-md max-w-[250px] rounded-xl">
//             <p>${object?.content}</p>
//           </div>
//         </div>
//           `;
//   }
// }
// function message_template(object, isWelcomeMessage = false) {
//   if (object?.role === "assistant") {
//     return `
//         <div class="relative p-4 flex space-x-1 items-start justify-start">
//           <div class="p-1 mt-1.5 border border-black rounded-full min-w-fit">
//             <img id="chat-bubble-icon" src=${bot_icon} alt="chat bubble icon" class="w-3 h-3" />
//           </div>
//           <div id="message-contain-div" class="text-sm p-2 px-2 bg-gray-100 shadow-md w-full max-w-fit rounded-xl">
//           ${
//             isWelcomeMessage
//               ? `<div>${object?.content}</div>`
//               : object?.content === null
//               ? `
//                 <div id="remove" class="flex flex-row space-x-1">
//                   <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.7s]"></div>
//                   <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.3s]"></div>
//                   <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.7s]"></div>
//                 </div>`
//               : `<textarea id="answer" readonly class="flex w-[250px] text-sm rounded-md border-input bg-transparent ring-offset-background resize-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 scrollbar-hide focus-visible:ring-0 focus-visible:ring-offset-0 border-0">${object?.content}</textarea>`
//           }
//           </div>
//         </div>
//       `;
//   } else {
//     return `
//         <div class="relative p-4 flex space-x-1 items-start justify-end">
//           <div class="text-sm bg-primary text-white p-2 px-2  shadow-md max-w-[250px] rounded-xl">
//             <p>${object?.content}</p>
//           </div>
//         </div>
//           `;
//   }
// }

// {chatbot?.starter_questions?.map(
//               (starter_question: StarterQuestion) => (
//                 <button
//                   type="button"
//                   onClick={(e: any) => {
//                     //   handleInputChange({
//                     //     target: { value: starter_question?.question }
//                     //   });
//                     //   generate_sessionId(e);

//                     setOpen(true);
//                     setOpeningTab("chat");
//                     setStarter_question(starter_question?.question);
//                   }}
//                   key={starter_question?.id}
//                   style={
//                     {
//                       "--main-color": appearanceForm
//                         ? appearanceForm?.accent_colour
//                         : chatbot?.accent_colour
//                     } as React.CSSProperties
//                   }
//                   className="text-[0.7rem] bg-white cursor-pointer rounded-xl disabled:cursor-not-allowed disabled:opacity-60 text-gray-400 hover:text-[var(--main-color)] border hover:border-[var(--main-color)] transition-all px-2 py-1 w-fit h-fit whitespace-nowrap"
//                 >
//                   {starter_question?.question}
//                 </button>
//               )
//             )}

function message_template(object, isWelcomeMessage = false) {
  if (object?.role === "assistant") {
    return `
        <div class="relative p-4 flex space-x-1 items-start justify-start">
          <div class="p-1 mt-1.5 border border-black rounded-full min-w-fit">
            <img id="chat-bubble-icon" src=${bot_icon} alt="chat bubble icon" class="w-3 h-3" />
          </div>
          <div id="message-contain-div" class="space-y-2 text-sm p-2 px-2 bg-gray-100 shadow-md w-3/4 max-w-fit rounded-xl">
          ${
            object?.content === null
              ? `
                <div id="remove" class="flex flex-row space-x-1">
                  <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.7s]"></div>
                  <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.3s]"></div>
                  <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:.7s]"></div>
                </div>`
              : markdownToHTML(object?.content)
          }
          
          </div>
        </div>
      `;
  } else {
    return `
        <div class="relative p-4 flex space-x-1 items-start justify-end">
          <div class="text-sm bg-primary text-white p-2 px-2  shadow-md max-w-[250px] rounded-xl">
            <p>${object?.content}</p>
          </div>
        </div>
          `;
  }
}

const conversation_template = (conversations) => {
  document.getElementById("conversation-list").innerHTML = "";

  let sorted = conversations.sort((a, b) => {
    const a_last_index = a?.messages?.length - 1;
    const a_latest_message = a?.messages[a_last_index]?.createdAt;

    const b_last_index = b?.messages?.length - 1;
    const b_latest_message = b?.messages[b_last_index]?.createdAt;

    return new Date(b_latest_message) - new Date(a_latest_message);
  });

  // after messaging ui should be updated with notification sound

  // console.log(sorted);

  sorted.forEach(function (conversation) {
    const sessionId = conversation._id;
    const last_index = conversation.messages.length - 1;
    const latest_message = conversation.messages[last_index];
    const result = timeDifference(
      new Date(latest_message?.createdAt),
      new Date(getCurrentDateTimeUTC())
    );

    const buttonElement = document.createElement("button");
    buttonElement.innerHTML = `
        <div class="relative flex flex-col w-[35px] h-[35px]">
          <img src=${creator_logo} id="creator-logo" class="rounded-full border-2 border-[var(--main-color)] object-cover w-8 h-8" alt="Creator">
        </div>
        <div class="w-full overflow-hidden">
          <p class="${
            !latest_message?.content && "hidden"
          } truncate text-sm text-gray-800">
            ${latest_message?.content}
          </p>
          <p class="text-xs text-gray-400">
            ${company_name} • ${result}
          </p>
        </div>
    `;

    buttonElement.onclick = function () {
      navigate("chat", sessionId);
      messagesId = sessionId;

      // console.log(currentConversationArray(sessionId));
    };

    buttonElement.style = "--tw-bg-hover-opacity: 0.1";
    buttonElement.className =
      "text-start min-h-[68px] flex items-center p-4 w-full space-x-4 hover-bg-primary transition-all overflow-hidden";

    document.getElementById("conversation-list").appendChild(buttonElement);
  });
};

function showExistingConversation(selected_conversation) {
  const messages_list = document.getElementById("messages-list");
  if (selected_conversation && selected_conversation.length !== 0) {
    // Ensure that chatbotUI.messages is an array before attempting to sort
    if (Array.isArray(selected_conversation)) {
      const messages = selected_conversation.sort(
        (a, b) => b?.createdAt - a?.createdAt
      );

      for (let message of messages) {
        const { role, content } = message;
        messages_list.innerHTML += message_template({
          role: role,
          content: content
        });

        // setTimeout(() => {
        //   const textareas = document.querySelectorAll("#answer");

        //   for (let textarea of textareas) {
        //     textarea.style.height = "fit-content";
        //     // console.log(textarea.scrollHeight);
        //     textarea.style.height = textarea.scrollHeight + "px";
        //   }
        // }, 0);
      }
    }
  }
}

const currentConversationArray = (sessionId, newMessage) => {
  const conversationArray = JSON.parse(localStorage.getItem("visitor_sessions"))
    ?.find((conversation) => conversation?._id === sessionId)
    ?.messages?.sort((a, b) => b?.createdAt - a?.createdAt);

  if (newMessage) {
    conversationArray.push({ ...newMessage });
  }

  return (
    conversationArray.map((message) => {
      const { role, content } = message;
      return { role, content };
    }) || []
  );
};

function navigate(page, sessionId) {
  const messages_list = document.getElementById("messages-list");
  const userInputField = document.getElementById("userInput");
  const visitor_sessions =
    JSON.parse(localStorage.getItem("visitor_sessions")) || [];

  const starterQuestionContainer = document.getElementById(
    "starterQuestionButtons"
  );

  // Function to scroll to the bottom of the div
  function scrollToBottom() {
    if (messages_list) {
      messages_list.scrollTop = messages_list.scrollHeight;
    }
  }

  // console.log(visitor_sessions);
  if (sessionId && messages_list.childElementCount === 1) {
    const messages = visitor_sessions.find(
      (visitor_session) => visitor_session._id === sessionId
    ).messages;
    showExistingConversation(messages);
  }

  const navigationTabs = document.getElementById("navigationTabs");

  const home_section = document.getElementById("home-section");
  const chat_section = document.getElementById("chat-section");
  const messages_section = document.getElementById("messages-section");

  const homeButton = document.getElementById("homeButton");
  // const chatButton = document.getElementById("chatButton");
  const messagesButton = document.getElementById("messagesButton");

  if (page === "home") {
    home_section.classList.remove("hidden");
    chat_section.classList.add("hidden");
    messages_section.classList.add("hidden");

    homeButton.classList.add("text-[var(--main-color)]");
    // chatButton.classList.remove("text-[var(--main-color)]");
    messagesButton.classList.remove("text-[var(--main-color)]");

    navigationTabs.classList.remove("hidden");

    while (messages_list.childElementCount > 1) {
      messages_list.removeChild(messages_list.lastChild);
    }

    messagesId = null;
    localStorage.setItem("last_location", "home");
    if (starterQuestionContainer.childElementCount !== 0) {
      starterQuestionContainer.innerHTML = null;
    }
  } else if (page === "messages") {
    home_section.classList.add("hidden");
    chat_section.classList.add("hidden");
    messages_section.classList.remove("hidden");

    homeButton.classList.remove("text-[var(--main-color)]");
    // chatButton.classList.remove("text-[var(--main-color)]");
    messagesButton.classList.add("text-[var(--main-color)]");

    navigationTabs.classList.remove("hidden");

    while (messages_list.childElementCount > 1) {
      messages_list.removeChild(messages_list.lastChild);
    }

    messagesId = null;
    localStorage.setItem("last_location", "messages");
    if (starterQuestionContainer.childElementCount !== 0) {
      starterQuestionContainer.innerHTML = null;
    }
  } else {
    home_section.classList.add("hidden");
    chat_section.classList.remove("hidden");
    messages_section.classList.add("hidden");

    homeButton.classList.remove("text-[var(--main-color)]");
    // chatButton.classList.add("text-[var(--main-color)]");
    messagesButton.classList.remove("text-[var(--main-color)]");

    navigationTabs.classList.add("hidden");

    userInputField.focus();
    scrollToBottom();

    if (
      starter_questions?.length !== 0 &&
      starterQuestionContainer.childElementCount === 0 &&
      !sessionId
    ) {
      starter_questions.forEach(function (starter_question) {
        let button = document.createElement("button");
        button.type = "button";
        button.textContent = starter_question.question;

        button.addEventListener("click", function () {
          userInputField.value = starter_question.question;
          document.getElementById("send").click();
        });

        button.className =
          "text-[0.7rem] cursor-pointer rounded-xl disabled:cursor-not-allowed disabled:opacity-60 text-gray-400 hover:text-[var(--main-color)] border hover:border-[var(--main-color)] transition-all px-2 py-1 w-fit h-fit whitespace-nowrap";
        starterQuestionContainer.appendChild(button);
      });
    }
  }
}

const ui = `
<div class="chatui scale-0 absolute sm:right-4 origin-bottom-right bottom-16 py-2 transition-all duration-200  px-4 sm:px-0 w-full h-[80vh] rounded-xl sm:max-w-[400px] z-[99999]">
  <div class="max-w-full w-full bg-transparent justify-end h-full items-end flex flex-col space-y-4 right-0">
    <div class="h-full bg-white flex flex-col rounded-2xl overflow-hidden w-full">

      <div id="messages-section" class="flex flex-col overflow-hidden w-full h-full hidden">
        <div class="bg-primary relative rounded-t-2xl flex items-center justify-center w-full h-fit p-4 py-6">
          <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-white text-lg leading-5 capitalize">Messages</label>
        </div>
        
        <div class="relative w-full flex flex-col h-full overflow-hidden">
          <div id="conversation-list" class="pb-[80px] flex flex-col h-full w-full overflow-scroll scrollbar-hide divide-y"></div>
          <div class="absolute bottom-0 w-full h-[90px] z-10 flex items-center justify-center bg-gradient-to-t from-white to-transparent">
          </div>
          <button id="chatButton3" style="--tw-bg-hover-opacity: 0.8" class="absolute bottom-5 -translate-x-1/2 left-1/2 bg-primary hover-bg-primary space-x-2 text-white py-2 px-4 rounded-full w-fit flex items-center justify-center text-sm z-20 transition-all">
            <span>
              Send us a message
            </span>
            <div>
              <svg viewBox="0 0 20 20" fill="white" class="rotate-90 w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </div>
          </button>
        </div>



      </div>


      <div id="chat-section" class="hidden flex flex-col overflow-hidden w-full h-full">
        <div class="bg-primary relative rounded-t-2xl flex items-center justify-start w-full h-fit p-2">
          <button onclick="navigate(localStorage.getItem('last_location') || 'home'); let sessions = JSON.parse(localStorage.getItem('visitor_sessions')); sessions && conversation_template(sessions);" class="w-12 h-12 flex items-center justify-center">
            <i class="fas fa-chevron-left text-base text-white"></i>
          </button>

          <div class="flex items-center space-x-3 p-1 py-3">
            <div class="flex items-center">
              <img id="creator-logo" class="rounded-full border-2 border-white object-cover w-10 h-10" alt="Creator">
            </div>
            <div class="flex flex-col tracking-wider">
              <label id="company-name" class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-white text-base capitalize"></label>
              <div class="flex items-center space-x-1 h-fit text-[0.7rem]">
                <i class="fa-regular fa-clock text-white text-[0.55rem]"></i>
                <label id="company-subheading" class="font-thin peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize text-white"></label>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-full bg-white flex flex-col overflow-hidden">
          <div id="messages-list" class="w-full h-full flex flex-col overflow-y-scroll scrollbar-hide"></div>
          <div class="flex flex-col w-full h-fit"> 
            <div id="starterQuestionButtons" class="px-2 py-2 flex flex-col items-end space-y-2 w-full h-fit overflow-scroll scrollbar-hide"></div>
          </div>
        </div>

          

        <div class="border-t"></div>
        <form class="flex items-center">
          <textarea class="flex w-full text-sm rounded-md border-input bg-background px-3 py-2 ring-offset-background resize-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-12 scrollbar-hide focus-visible:ring-0 focus-visible:ring-offset-0 border-0" id="userInput" value="" name="userInput" ></textarea>
          <button type="submit" id="send" class="text-gray-400 relative h-full min-w-[30px] flex items-center justify-start">
            <svg viewBox="0 0 20 20" fill="var(--main-color)" class="rotate-90 w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </form>
        </div>


        <div id="home-section" class="relative flex flex-col overflow-hidden w-full h-full">
          <div class="relative z-0 h-[388px] flex flex-col bg-gradient-to-br from-[var(--darker-shade)] via-[var(--main-color)] to-[var(--lighter-shade)]">
            <div class="absolute bottom-0 left-0 w-full h-[140px] bg-gradient-to-b from-transparent to-white"></div>
          </div>
            <div class="absolute z-10 top-0 left-0 flex flex-col space-y-4 overflow-scroll scrollbar-hide p-4 w-full h-full">
              <div class="flex flex-col px-4 pt-4 space-y-10">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                  <img id="company-logo" alt="company logo" class="w-10 h-10 invert rounded-full object-cover" />
                  </div> 
                  <div class="flex items-center">
                    <img id="creator-logo" class="rounded-full border-2 border-white object-cover w-10 h-10" alt="Creator"/>
                  </div>      
                </div>
                <div class="text-3xl font-bold">
                  <h1 class="text-white/50">Hello there.</h1>
                  <h1 class="text-white">How can we help?</h1>
                </div>
              </div>
              <button id="chatButton2" class="w-full group">
                <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-pointer">
                  <div class="flex flex-col">
                      <span class="group-hover:text-[var(--main-color)] transition-all font-semibold text-start text-gray-700">Send us a message</span>
                      <span class="text-sm text-gray-500">We typically reply within a day</span>
                  </div>
                  <div>
                    <svg viewBox="0 0 20 20" fill="var(--main-color)" class="rotate-90 w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </div>
                </div>
              </button>
              <div class="bg-white rounded-xl p-2 shadow-md flex flex-col space-y-4">
                <div>
                  <input
                  id="search"
                  type="text"
                  placeholder="Search FAQs..."
                  class="flex bg-gray-100 w-full text-sm h-10 rounded-full border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 scrollbar-hide focus-visible:ring-0 focus-visible:ring-offset-0 border"
                  />
                </div>
                <ul id="faq-list" class="text-gray-600 flex flex-col overflow-y-scroll overflow-x-hidden scrollbar-hide h-full w-full">
                </ul>
              </div>
            </div>
          </div>

        <div id="navigationTabs" class="w-full px-4 py-2 border-t">
          <div class="flex space-x-2 items-center text-gray-400">
            <!-- home -->
            <button id="homeButton" class="flex flex-col items-center hover:text-[var(--main-color)] text-[var(--main-color)] transition-all w-full">
              <i class="fa-solid fa-house icon-center text-lg"></i>
              <div class="text-xs mt-1">Home</div>
            </button>
            <!-- chat -->
            <!-- <button id="chatButton" class="flex flex-col items-center hover:text-[var(--main-color)] text-[var(--main-color)] transition-all w-full">-->
            <!--   <i class="far fa-envelope icon-center text-lg"></i>-->
            <!--   <div class="text-xs mt-1">Chat</div>-->
            <!-- </button>-->
            <!-- messages -->
            <button id="messagesButton" class="flex flex-col items-center hover:text-[var(--main-color)] transition-all w-full">
              <i class="far fa-envelope icon-center text-lg"></i>
              <div class="text-xs mt-1">Messages</div>
            </button>
          </div>
        </div>



    </div>
  </div>
</div>
<button id="toggleButtonOpen" class="bg-primary right-4 transition-all text-white z-[99999999] rounded-full absolute bottom-4 p-2 h-fit scale-90 transition-all hover:scale-100">
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

const fontAwesomeScript = document.createElement("link");
fontAwesomeScript.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css";
fontAwesomeScript.rel = "stylesheet";
// Remove the integrity attribute
// fontAwesomeScript.integrity = "sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==";
fontAwesomeScript.crossorigin = "anonymous";
fontAwesomeScript.referrerpolicy = "no-referrer";

document.head.appendChild(fontAwesomeScript);


const showdownScript = document.createElement("script");
showdownScript.src =
  "https://cdn.jsdelivr.net/npm/showdown@latest/dist/showdown.min.js";
document.head.appendChild(showdownScript);

const styleElem = document.createElement("style");
styleElem.innerHTML = `

  #message-contain-div ul{
    display: block;
    list-style-type: disc;
    padding-inline-start: 20px;
  }

  .faq-item:has(.active) .answer {
    display: block;
  }

  .faq-item:not(.active) .answer {
    display: none;
  }

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

  body {
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  `;

document.body.appendChild(styleElem);

document.addEventListener("DOMContentLoaded", async function () {
  localStorage.setItem("last_location", "home");

  let visitorId = JSON.parse(localStorage.getItem("visitorId")) || null;

  const fetch_initial = await fetch("https://chatbot-server-2668.vercel.app/api/fetch-chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      visitorId
    })
  });

  const chatbotUI = await fetch_initial.json();

  if (!chatbotUI) return;

  bot_icon = chatbotUI.chat_bubble_icon;
  company_name = chatbotUI.company_name;
  creator_logo = chatbotUI?.creator_logo;

  const [darkerShade, lighterShade] = generateShades(chatbotUI?.accent_colour);

  // console.log(chatbotUI);
  localStorage.setItem("visitorId", JSON.stringify(chatbotUI.visitor._id));

  const visitor_sessions = chatbotUI.visitor.sessions?.map((session) => {
    return {
      ...session,
      messages: session.messages.map((message) => {
        const { role, content, createdAt } = message;
        return { role, content, createdAt };
      })
    };
  });

  // console.log(visitor_sessions);
  localStorage.setItem("visitor_sessions", JSON.stringify(visitor_sessions));

  visitorId = chatbotUI?.visitor?._id;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const div = document.createElement("div");
  div.innerHTML = ui;
  document.body.appendChild(div);

  // DOM elements
  const toggleButtonOpen = document.getElementById("toggleButtonOpen");
  const userInputField = document.getElementById("userInput");
  const sendButton = document.getElementById("send"); // Add this line
  const messages_list = document.getElementById("messages-list");
  const starterQuestionContainer = document.getElementById(
    "starterQuestionButtons"
  );
  const starterQuestionContainerOnClose = document.getElementById(
    "starterQuestionButtonsOnClose"
  );

  // Function to scroll to the bottom of the div
  function scrollToBottom() {
    if (messages_list) {
      messages_list.scrollTop = messages_list.scrollHeight;
    }
  }

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

  faqs = chatbotUI && chatbotUI.faqs ? chatbotUI.faqs : [];
  starter_questions =
    chatbotUI && chatbotUI.starter_questions ? chatbotUI.starter_questions : [];

  let conversations =
    chatbotUI && chatbotUI.visitor && chatbotUI.visitor.sessions
      ? chatbotUI.visitor.sessions
      : [];

  faqs.forEach(function (faq) {
    document.getElementById("faq-list").innerHTML += `
      <li style="--tw-bg-hover-opacity: 0.1" class="faq-item hover-bg-primary rounded-lg cursor-pointer py-2 px-3 group transition-all">
      <div class="question flex justify-between items-center group-hover:text-[var(--main-color)] transition-all">
      <span class="text-sm">${faq.question}</span>
      <i class="fas fa-chevron-right text-xs text-[var(--main-color)] transition-all"></i>
      </div>
      <div class="answer mt-2 text-sm">
      ${faq.answer}
      </div>
      </li>
      `;
  });

  conversation_template(conversations);

  document.querySelectorAll("#company-logo").forEach((elem) => {
    elem.src = chatbotUI?.company_logo;
  });

  document.querySelectorAll("#creator-logo").forEach((elem) => {
    elem.src = chatbotUI?.creator_logo;
  });

  document.querySelectorAll("#company-name").forEach((elem) => {
    elem.textContent = chatbotUI?.company_name;
  });

  document.getElementById("company-subheading").textContent =
    chatbotUI?.subheading;
  document.getElementById("chat-bubble-icon").src = chatbotUI?.chat_bubble_icon;
  // document.getElementById("welcomeMessageLabel").textContent =
  //   chatbotUI?.welcome_message;
  userInputField.placeholder = chatbotUI?.input_box_placeholder;
  showWelcomeMessage = chatbotUI?.show_floating_welcome_message;
  showStarterQuestions = chatbotUI?.show_floating_starter_questions;
  show = chatbotUI.widget === "open" ? true : false;
  widget_position = chatbotUI.widget_position;

  // console.log(widget_position === "left");
  if (widget_position === "left") {
    document
      .querySelector(".chatui")
      ?.classList.replace("sm:right-4", "sm:left-4");
    document
      .querySelector(".chatui")
      ?.classList.replace("origin-bottom-right", "origin-bottom-left");
    document
      .getElementById("toggleButtonOpen")
      ?.classList.replace("right-4", "left-4");
  }

  // console.log(show)

  const welcomeMessage_starter_Container = document.createElement("div");

  welcomeMessage_starter_Container.className = `flex absolute bottom-[4.5rem] space-y-2 flex-col sm:max-w-[280px] w-[90%] h-fit sm:w-full z-[99999] ${
    widget_position === "right" ? "right-4" : "left-4"
  }`;

  const widget_container = document.querySelector(".chatui").parentElement;
  widget_container.insertBefore(
    welcomeMessage_starter_Container,
    widget_container.children[0]
  );

  setTimeout(() => {
    if (showWelcomeMessage) {
      const welcome_message_container = `<!--  welcome message start -->
      <div id="welcome-message" onclick="
        toggleButtonOpen.click()
        localStorage.setItem('last_location', 'messages');
        navigate('chat')
      " class="flex cursor-pointer bg-gray-100 flex-col shadow-md w-full px-4 py-2 h-fit rounded-xl">
      <div class="flex items-center space-x-2">
      <div>
      <img src=${chatbotUI.company_logo} alt="company logo" class="rounded-full w-6 h-6 object-contain min-w-6"/>
      </div>
          <Label class="w-full cursor-pointer font-bold text-base truncate">
            ${chatbotUI.company_name}
          </Label>
          <button
        type="button"
        class="min-w-6 h-6 flex items-center justify-center"
        onclick="
        event.stopPropagation(); // This prevents the click event from reaching the parent div
        showWelcomeMessage = false;
        if(document.getElementById('welcome-message')) document.getElementById('welcome-message').remove();
        "
        >
        <i class="fa-solid fa-xmark text-lg text-gray-500"></i>
        </button>
        
        </div>
        <p class="text-sm truncate">
        ${chatbotUI.welcome_message}
        </p>
        </div>
        <!-- welcome message end -->`;

      welcomeMessage_starter_Container.innerHTML += welcome_message_container;
    }
    if (showStarterQuestions) {
      const statrter_questions_container = `
      <!-- statrter question start -->
      <div class="flex flex-col w-full h-fit">
      <div id="starterQuestionButtonsOnClose" class="${
        widget_position === "right" ? "items-end" : "items-start"
      } px-2 py-2 flex flex-col space-y-2 w-full h-fit overflow-scroll scrollbar-hide"></div>
      </div>
      <!-- statrter question end -->
      `;

      welcomeMessage_starter_Container.innerHTML +=
        statrter_questions_container;

      const starterQuestionContainerOnClose = document.getElementById(
        "starterQuestionButtonsOnClose"
      );

      starter_questions.forEach(function (starter_question) {
        let button = document.createElement("button");
        button.type = "button";
        button.textContent = starter_question.question;

        button.addEventListener("click", function () {
          toggleButtonOpen.click();
          localStorage.setItem("last_location", "messages");
          navigate("chat");
          userInputField.value = starter_question.question;
          document.getElementById("send").click();
        });

        button.className =
          "text-[0.7rem] cursor-pointer bg-white rounded-xl disabled:cursor-not-allowed disabled:opacity-60 text-gray-400 hover:text-[var(--main-color)] border hover:border-[var(--main-color)] transition-all px-2 py-1 w-fit h-fit whitespace-nowrap";
        starterQuestionContainerOnClose.appendChild(button);
      });
    }
  }, 10000);

  if (show) {
    document
      .querySelector(".chatui")
      ?.classList.replace("scale-0", "scale-100");
    document.querySelector(".show")?.classList.replace("show", "hide");
    document.querySelector(".hide2")?.classList.replace("hide2", "show2");
    // showWelcomeMessagebtn.classList.replace("flex", "hidden");
    show = false;
  } else {
    document
      .querySelector(".chatui")
      ?.classList.replace("scale-100", "scale-0");
    document.querySelector(".hide")?.classList.replace("hide", "show");
    document.querySelector(".show2")?.classList.replace("show2", "hide2");
    // showWelcomeMessagebtn.classList.replace("hidden", "flex");
    show = true;
  }

  const rgb = hexToRgb(chatbotUI.accent_colour);

  styleElem.innerHTML += `
    :root {
      --main-color: ${chatbotUI?.accent_colour};
      --darker-shade: ${darkerShade};
      --lighter-shade: ${lighterShade};
      --tw-bg-opacity: 1;
    }

    .hover-bg-primary:hover {
      --tw-bg-hover-opacity: 1;
      background: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, var(--tw-bg-hover-opacity));
    }

    .bg-primary{
      background: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, var(--tw-bg-opacity));
    }

    .border-primary {
      border-color : rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, var(--tw-border-opacity));
    }
    `;

  // Further processing based on the response

  messages_list.innerHTML = message_template(
    {
      content: chatbotUI?.welcome_message,
      role: "assistant"
    },
    true
  );

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

  const updateSessionsInLocalStorage = (sessionId, question, result) => {
    let sessions = JSON.parse(localStorage.getItem("visitor_sessions"));
    const findCurrentSessionindex = sessions.findIndex(
      (session) => session._id === sessionId
    );

    const updatedMessages = [
      ...sessions[findCurrentSessionindex].messages,
      { role: "user", content: question, createdAt: getCurrentDateTimeUTC() },
      { role: "assistant", content: result, createdAt: getCurrentDateTimeUTC() }
    ];

    sessions[findCurrentSessionindex] = {
      ...sessions[findCurrentSessionindex],
      messages: updatedMessages
    };

    // console.log(sessions);
    localStorage.setItem("visitor_sessions", JSON.stringify(sessions));
    conversation_template(sessions);
  };

  // Form submit event
  const form = document.querySelector("form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // this will remove and welcome message the buttons of starter questions
    setTimeout(() => {
      if (starterQuestionContainer.childElementCount !== 0) {
        starterQuestionContainer.innerHTML = null;
        if (document.getElementById("welcome-message"))
          document.getElementById("welcome-message").remove();
        if (document.getElementById("starterQuestionButtonsOnClose"))
          document.getElementById("starterQuestionButtonsOnClose").remove();
      }
    }, 100);

    const visitor_sessions =
      JSON.parse(localStorage.getItem("visitor_sessions")) || [];

    if (!messagesId) {
      const generate_sessionId = await fetch(
        "https://chatbot-server-2668.vercel.app/api/generate-sessionId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token,
            visitorId
          })
        }
      );

      const new_session = await generate_sessionId.json();
      // console.log(new_session);
      if (!new_session) {
        throw new Error("created new session not found.");
      }

      let updated_visitor_sessions = [...visitor_sessions, new_session];

      messagesId = new_session._id;
      localStorage.setItem(
        "visitor_sessions",
        JSON.stringify(updated_visitor_sessions)
      );

      // console.log(updated_visitor_sessions);
      conversation_template(updated_visitor_sessions);
    }

    // Get user input
    const userInput = userInputField.value;

    const question = userInput.trim();
    // Hide the send button on form submission

    if (question === "" || !question) return;

    messages_list.innerHTML += message_template({
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
    // faqArray.forEach((btn) => {
    //   btn.disabled = true;
    // });

    // console.log(
    //   currentConversationArray(messagesId, {
    //     role: "user",
    //     content: question
    //   })
    // );

    const response = await fetch("https://chatbot-server-2668.vercel.app/api/get-bot-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionId: messagesId,
        messages: currentConversationArray(messagesId, {
          role: "user",
          content: question
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

      // let lastChild_textarea = messages_list.lastElementChild.lastElementChild;
      // let textarea;

      // count++;
      // if (count === 1) {
      //   document.getElementById("remove").remove();
      //   const textareaElement = document.createElement("textarea");
      //   lastChild_textarea.append(textareaElement);
      //   textareaElement.setAttribute("readonly", true);
      //   textareaElement.className =
      //     "flex w-[250px] text-sm rounded-md border-input bg-transparent ring-offset-background resize-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 scrollbar-hide focus-visible:ring-0 focus-visible:ring-offset-0 border-0";
      //   textareaElement.id = "answer";
      // }
      // textarea =
      //   messages_list.lastElementChild.lastElementChild.lastElementChild;

      // textarea.innerHTML += value;

      // textarea.style.height = "fit-content";
      // // console.log(textarea.scrollHeight);
      // textarea.style.height = textarea.scrollHeight + "px";

      let message_contain_div = messages_list.lastElementChild.lastElementChild;

      count++;
      if (count === 1) {
        document.getElementById("remove").remove();
      }

      message_contain_div.innerHTML += value;

      result += value;
      scrollToBottom();
    }

    messages_list.lastElementChild.lastElementChild.innerHTML =
      markdownToHTML(result);

    updateSessionsInLocalStorage(messagesId, question, result);

    // console.log(messages);

    // Scroll to the bottom after updating messages
    userInputField.placeholder = chatbotUI?.input_box_placeholder;
    userInputField.disabled = false;
    userInputField.focus();
    document.getElementById("send").disabled = false;
    // Disable buttons using forEach on the array
    // faqArray.forEach((btn) => {
    //   btn.disabled = false;
    // });

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

  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    faqItems.forEach((item) => {
      const isVisible = item.textContent.toLowerCase().includes(searchTerm);
      item.classList.toggle("hidden", !isVisible);
    });
  });

  // Event listeners for navigation buttons
  const homeButton = document.getElementById("homeButton");
  // const chatButton = document.getElementById("chatButton");
  const chatButton2 = document.getElementById("chatButton2");
  const chatButton3 = document.getElementById("chatButton3");
  const messagesButton = document.getElementById("messagesButton");

  homeButton.addEventListener("click", () => navigate("home"));
  // chatButton.addEventListener("click", () => navigate("chat"));
  chatButton2.addEventListener("click", () => navigate("chat"));
  chatButton3.addEventListener("click", () => navigate("chat"));
  messagesButton.addEventListener("click", () => navigate("messages"));

  faqItems.forEach((faqItem) => {
    faqItem.addEventListener("click", (e) => {
      if (e.target.classList.contains("answer")) return;

      // Toggle the 'active' class on the clicked FAQ item
      faqItem.classList.toggle("active");

      // Hide or show the answer based on the 'active' class
      const answer = faqItem.querySelector(".answer");
      answer.classList.toggle("hidden", !faqItem.classList.contains("active"));

      // Toggle the chevron icon based on the 'active' class
      const icon = faqItem.querySelector("i");
      if (faqItem.classList.contains("active")) {
        icon.classList.replace("fa-chevron-right", "fa-chevron-down");
      } else {
        icon.classList.replace("fa-chevron-down", "fa-chevron-right");
      }

      // Collapse other FAQ items if the clicked one is active
      if (faqItem.classList.contains("active")) {
        faqItems.forEach((item) => {
          if (item !== faqItem) {
            item.classList.remove("active");
            item.querySelector(".answer").classList.add("hidden");
            item
              .querySelector("i")
              .classList.replace("fa-chevron-down", "fa-chevron-right");
          }
        });
      }
    });
  });
});
