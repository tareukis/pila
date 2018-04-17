
window.App = {
  run() {
    this.cacheDOM()
    this.bindListeners()
    this.stack = []
    this.flag = true
  },
  failManager() {
    console.log('ESTÁ MAL', this.lastItemOfStack)
    this.$input.classList.add('bad')
    this.flag = false
  },
  onInput(e) {
    this.tx = e.target.value
      .replace(/\n/, '')
      .replace('\t', '')
      .split('')

    this.stack = []

    this.tx.forEach(l => {
      console.clear()
      console.log (l)

      if (this.flag) {
        if (l === '{' || l === '[' || l === '(') {
          this.stack.push(l)
        }

        this.lastItemOfStack = this.stack[this.stack.length - 1]

        if (l === '}') {
          if (this.lastItemOfStack === '{') {
            console.log(this.lastItemOfStack === '{')
            this.stack.pop()
            this.flag = true
            console.log('llave removida')
          } else {
            this.failManager()
          }
         }

        if (l === ']') {
          if (this.lastItemOfStack === '[') {
            this.stack.pop()
            this.flag = true
            console.log('corchete removida')
          } else {
            this.failManager()
          }
         }

         console.log('stacklength: ' + this.stack.length, this.stack.join(' | '))

        if (l === ')') {
          console.log('entró');
          console.log( '-----' );
          console.log(this.lastItemOfStack, l);
          console.log(this.stack[this.stack.length - 1], l);
          console.log( '-----' );
          console.log(this.lastItemOfStack === '(')

          if (this.lastItemOfStack === '(') {
            this.stack.pop()
            this.flag = true
            console.log('parentesis removida')
          } else {
            this.failManager()
          }
         }
      }
    })

    if (!this.flag || this.stack.length !== 0) this.failManager()

    if (this.flag) {
      this.$input.classList.remove('bad')
      console.log('Todo está bien')
    }

    this.flag = true

  },
  cacheDOM() {
    this.$input = document.getElementById('inputText')
  },
  bindListeners() {
    this.$input.addEventListener('input', this.onInput.bind(this))
  }
}

App.run()
