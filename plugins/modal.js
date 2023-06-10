Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement("div");
  }

  const wrap = document.createElement("div");
  wrap.classList.add("modal-footer");

  buttons.forEach((btn) => {
    const $btn = document.createElement("button");
    $btn.textContent = btn.text;
    $btn.classList.add(`btn-${btn.type || "secondary"}`);
    $btn.onclick = btn.handler || noop;

    wrap.appendChild($btn);
  });

  return wrap;
}

function _createModal(options) {
  const DEFAULT_WIDTH = "600px";
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("main-modal");
  modalDiv.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${
          options.width || DEFAULT_WIDTH
        }">
          <div class="modal-header">
            <span class="modal-title">${options.title || "Window"}</span>
            ${
              options.closable
                ? `<span class="modal-close" data-close="true">&times;</span>`
                : ""
            }
          </div>
          <div class="modal-body" data-content>
            ${options.content || ""}
          </div>
        </div>
    </div>
    `
  );
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(modalDiv.querySelector("[data-content]"));
  document.body.appendChild(modalDiv);
  return modalDiv;
}

$.modal = function (options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let clossing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log("Modal is destroyed");
      }
      !clossing && $modal.classList.add("open");
    },
    close() {
      clossing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        clossing = false;
      }, ANIMATION_SPEED);
    },
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener("click", listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector("[data-content]").innerHTML = html;
    },
  });
};
