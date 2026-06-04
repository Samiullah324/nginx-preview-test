/**
 * Chat Widget JavaScript
 * 
 * Implements the floating chat widget functionality:
 * - Dynamically creates chat widget HTML structure on DOM load
 * - Toggles chat panel visibility when icon is clicked
 * - Handles opening/closing with smooth CSS transitions
 * - Manages event listeners for click, Escape key, and form submission
 * - Provides simulated auto-replies for demo purposes
 */
(function () {
  var SUPPORT_NAME = 'Support Team';
  var WELCOME_MESSAGE =
    'Hi there! Welcome to Student Management System support. How can we help you today?';

  var AUTO_REPLIES = [
    'Thanks for your message. A support agent will follow up with you shortly.',
    'Got it — we have received your message and will get back to you soon.',
    'Thank you for reaching out. Our team is reviewing your request.',
  ];

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function createWidget() {
    var widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.id = 'chat-widget';
    widget.innerHTML =
      '<button type="button" class="chat-widget__toggle" id="chat-widget-toggle" aria-expanded="false" aria-controls="chat-widget-panel" aria-label="Chat with us">' +
      '<svg class="chat-widget__toggle-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z"/>' +
      '</svg>' +
      '</button>' +
      '<div class="chat-widget__panel" id="chat-widget-panel" role="dialog" aria-labelledby="chat-widget-title" aria-hidden="true">' +
      '<div class="chat-widget__header">' +
      '<div class="chat-widget__header-info">' +
      '<h2 class="chat-widget__title" id="chat-widget-title">Chat with Us</h2>' +
      '<p class="chat-widget__subtitle">We typically reply within a few minutes</p>' +
      '</div>' +
      '<button type="button" class="chat-widget__close" id="chat-widget-close" aria-label="Close chat">' +
      '&times;' +
      '</button>' +
      '</div>' +
      '<div class="chat-widget__messages" id="chat-widget-messages" role="log" aria-live="polite" aria-relevant="additions"></div>' +
      '<form class="chat-widget__form" id="chat-widget-form">' +
      '<label for="chat-widget-input" class="visually-hidden">Your message</label>' +
      '<input type="text" class="chat-widget__input" id="chat-widget-input" placeholder="Type your message…" autocomplete="off" maxlength="1000" required>' +
      '<button type="submit" class="chat-widget__send" id="chat-widget-send">Send</button>' +
      '</form>' +
      '</div>';

    document.body.appendChild(widget);
    return widget;
  }

  function appendMessage(container, text, sender, timestamp) {
    var message = document.createElement('div');
    message.className =
      'chat-widget__message chat-widget__message--' + (sender === 'user' ? 'user' : 'support');

    var metaLabel = sender === 'user' ? 'You' : SUPPORT_NAME;
    message.innerHTML =
      text +
      '<span class="chat-widget__message-meta">' +
      metaLabel +
      ' · ' +
      formatTime(timestamp) +
      '</span>';

    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
  }

  function initChatWidget() {
    if (document.getElementById('chat-widget')) {
      return;
    }

    var widget = createWidget();
    var toggle = document.getElementById('chat-widget-toggle');
    var panel = document.getElementById('chat-widget-panel');
    var closeBtn = document.getElementById('chat-widget-close');
    var messages = document.getElementById('chat-widget-messages');
    var form = document.getElementById('chat-widget-form');
    var input = document.getElementById('chat-widget-input');
    var sendBtn = document.getElementById('chat-widget-send');
    var isOpen = false;
    var hasWelcomed = false;
    var replyIndex = 0;
    var pendingReply = null;

    function setOpen(open) {
      isOpen = open;
      widget.classList.toggle('chat-widget--open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');

      if (open) {
        if (!hasWelcomed) {
          appendMessage(messages, WELCOME_MESSAGE, 'support', new Date());
          hasWelcomed = true;
        }
        input.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen);
    });

    closeBtn.addEventListener('click', function () {
      setOpen(false);
      toggle.focus();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen) {
        setOpen(false);
        toggle.focus();
      }
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var text = input.value.trim();
      if (!text) {
        return;
      }

      appendMessage(messages, text, 'user', new Date());
      input.value = '';
      sendBtn.disabled = true;

      if (pendingReply) {
        clearTimeout(pendingReply);
      }

      pendingReply = setTimeout(function () {
        var reply = AUTO_REPLIES[replyIndex % AUTO_REPLIES.length];
        replyIndex += 1;
        appendMessage(messages, reply, 'support', new Date());
        sendBtn.disabled = false;
        input.focus();
        pendingReply = null;
      }, 900);
    });

    input.addEventListener('input', function () {
      sendBtn.disabled = !input.value.trim();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }
})();
