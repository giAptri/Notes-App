class ToastNotification extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .toast {
            visibility: hidden;
            min-width: 250px;
            margin-left: -125px;
            background-color: #333;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            padding: 16px;
            position: fixed;
            z-index: 1000;
            left: 50%;
            bottom: 30px;
            opacity: 0;
            transition: opacity 0.5s, visibility 0.5s, bottom 0.5s;
          }
          
          .toast.success {
            background-color: #4CAF50;
          }
          
          .toast.error {
            background-color: #f44336;
          }
          
          .toast.show {
            visibility: visible;
            opacity: 1;
            bottom: 30px;
          }
        </style>
        
        <div class="toast" id="toast"></div>
      `;
    }
  
    show(message, type = 'default', duration = 3000) {
      const toast = this.shadowRoot.getElementById('toast');
      toast.textContent = message;
      
      // Reset classes
      toast.className = 'toast';
      
      // Add type class
      if (type === 'success') {
        toast.classList.add('success');
      } else if (type === 'error') {
        toast.classList.add('error');
      }
      
      // Show toast
      toast.classList.add('show');
      
      // Hide after duration
      setTimeout(() => {
        toast.classList.remove('show');
      }, duration);
    }
  }
  
  customElements.define('toast-notification', ToastNotification);