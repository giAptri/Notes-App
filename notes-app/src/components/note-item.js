class NoteItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
      
      // Add event listeners to buttons
      this.shadowRoot.querySelector('.delete-btn').addEventListener('click', (event) => {
        event.stopPropagation();
        this.dispatchEvent(
          new CustomEvent('delete-note', {
            detail: { id: this.getAttribute('id') },
            bubbles: true,
            composed: true,
          })
        );
      });
      
      this.shadowRoot.querySelector('.archive-btn').addEventListener('click', (event) => {
        event.stopPropagation();
        this.dispatchEvent(
          new CustomEvent('archive-note', {
            detail: { 
              id: this.getAttribute('id'),
              archived: this.getAttribute('archived') === 'true'
            },
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  
    static get observedAttributes() {
      return ["id", "title", "body", "created-at", "archived"];
    }
  
    attributeChangedCallback() {
      this.render();
    }
  
    render() {
      const isArchived = this.getAttribute('archived') === 'true';
      const archiveBtnText = isArchived ? 'Unarchive' : 'Archive';
      const createdAt = new Date(this.getAttribute('created-at')).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      this.shadowRoot.innerHTML = `
        <style>
          .note-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            position: relative;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            overflow: hidden;
          }
          
          .note-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          
          h3 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 18px;
          }
          
          .date {
            color: #888;
            font-size: 12px;
            margin-bottom: 10px;
          }
          
          .note-body {
            color: #666;
            margin-bottom: 15px;
            max-height: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }
          
          button {
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
          }
          
          .archive-btn {
            background-color: #ffc107;
            color: #000;
          }
          
          .archive-btn:hover {
            background-color: #ffdb58;
          }
          
          .delete-btn {
            background-color: #dc3545;
            color: white;
          }
          
          .delete-btn:hover {
            background-color: #c82333;
          }
          
          /* Optional animation for new cards */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .note-card {
            animation: fadeIn 0.5s ease-out;
          }
        </style>
        
        <div class="note-card">
          <h3>${this.getAttribute("title") || ""}</h3>
          <div class="date">${createdAt}</div>
          <div class="note-body">${this.getAttribute("body") || ""}</div>
          <div class="actions">
            <button class="archive-btn">${archiveBtnText}</button>
            <button class="delete-btn">Delete</button>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define("note-item", NoteItem);