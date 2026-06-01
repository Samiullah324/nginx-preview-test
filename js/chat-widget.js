(function () {
  var STORAGE_KEY = 'support-chat-messages';
  var WELCOME_MESSAGE =
    'Hi there! Welcome to Student Management System support. How can we help you today?';

  function getStoredMessages() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveMessages(messages) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore storage errors */
    }
  }

  function formatTime(isoString) {
    var date = new Date(isoString);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  function createWidget() {
    var root = document.createElement('div');
    root.className = 'chat-widget';
    root.id = 'chat-widget';
    root.innerHTML =
      '<div class="chat-panel" id="chat-panel" hidden>' +
      '  <header class="chat-panel__header">' +
      '    <div>' +
      '      <h2 class="chat-panel__title">Chat with Us</h2>' +
      '      <p class="chat-panel__subtitle">We typically reply within a few minutes</p>' +
      '    </div>' +
      '    <button type="button" class="chat-panel__close" id="chat-close" aria-label="Close chat">&times;</button>' +
      '  </header>' +
      '  <div class="chat-panel__messages" id="chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div>' +
      '  <form class="chat-panel__composer" id="chat-form">' +
      '    <input type="text" class="chat-panel__input" id="chat-input" placeholder="Type your message…" autocomplete="off" maxlength="500" required aria-label="Message">' +
      '    <button type="submit" class="chat-panel__send" id="chat-send">Send</button>' +
      '  </form>' +
      '</div>' +
      '<button type="button" class="chat-widget__launcher" id="chat-launcher" aria-label="Chat with us" aria-expanded="false" aria-controls="chat-panel">' +
      '  <svg class="chat-widget__launcher-icon" viewBox="0 0 24 24" aria-hidden="true">' +
      '    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>' +
      '  </svg>' +
      '</button>';

    document.body.appendChild(root);
    return root;
  }

  function renderMessage(container, message) {
    var item = document.createElement('div');
    item.className =
      'chat-message chat-message--' + (message.role === 'user' ? 'user' : 'support');

    var bubble = document.createElement('div');
    bubble.className = 'chat-message__bubble';
    bubble.textContent = message.text;

    var meta = document.createElement('div');
    meta.className = 'chat-message__meta';
    meta.textContent =
      (message.role === 'user' ? 'You' : 'Support') +
      (message.timestamp ? ' · ' + formatTime(message.timestamp) : '');

    item.appendChild(bubble);
    item.appendChild(meta);
    container.appendChild(item);
    container.scrollTop = container.scrollHeight;
  }

  function renderAllMessages(container, messages) {
    container.innerHTML = '';
    messages.forEach(function (message) {
      renderMessage(container, message);
    });
  }

  function setStatus(panel, text, isError) {
    var existing = panel.querySelector('.chat-panel__status');
    if (existing) {
      existing.remove();
    }

    if (!text) {
      return;
    }

    var status = document.createElement('div');
    status.className = 'chat-panel__status' + (isError ? ' chat-panel__status--error' : '');
    status.textContent = text;
    panel.appendChild(status);
  }

  function openChat(widget, panel, launcher, messagesContainer, messages) {
    panel.hidden = false;
    widget.classList.add('chat-widget--open');
    launcher.setAttribute('aria-expanded', 'true');

    if (messages.length === 0) {
      var welcome = {
        role: 'support',
        text: WELCOME_MESSAGE,
        timestamp: new Date().toISOString(),
      };
      messages.push(welcome);
      saveMessages(messages);
      renderMessage(messagesContainer, welcome);
    }

    var input = document.getElementById('chat-input');
    if (input) {
      input.focus();
    }
  }

  function closeChat(widget, panel, launcher) {
    panel.hidden = true;
    widget.classList.remove('chat-widget--open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }

  async function sendMessage(messageText, messages, messagesContainer, panel, sendButton) {
    var userMessage = {
      role: 'user',
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    messages.push(userMessage);
    saveMessages(messages);
    renderMessage(messagesContainer, userMessage);
    setStatus(panel, '');

    sendButton.disabled = true;

    try {
      var response = await fetch('/api/support/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      var data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send message.');
      }

      var supportMessage = {
        role: 'support',
        text: data.reply,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      messages.push(supportMessage);
      saveMessages(messages);
      renderMessage(messagesContainer, supportMessage);
    } catch (error) {
      setStatus(panel, error.message || 'Something went wrong. Please try again.', true);
    } finally {
      sendButton.disabled = false;
    }
  }

  function initChatWidget() {
    if (document.getElementById('chat-widget')) {
      return;
    }

    var widget = createWidget();
    var panel = document.getElementById('chat-panel');
    var launcher = document.getElementById('chat-launcher');
    var closeButton = document.getElementById('chat-close');
    var form = document.getElementById('chat-form');
    var input = document.getElementById('chat-input');
    var sendButton = document.getElementById('chat-send');
    var messagesContainer = document.getElementById('chat-messages');
    var messages = getStoredMessages();

    renderAllMessages(messagesContainer, messages);

    launcher.addEventListener('click', function () {
      openChat(widget, panel, launcher, messagesContainer, messages);
    });

    closeButton.addEventListener('click', function () {
      closeChat(widget, panel, launcher);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var text = input.value.trim();
      if (!text) {
        return;
      }

      input.value = '';
      sendMessage(text, messages, messagesContainer, panel, sendButton);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !panel.hidden) {
        closeChat(widget, panel, launcher);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }
})();
