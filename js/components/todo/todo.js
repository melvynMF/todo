import { LitElement, html, css } from 'lit-element';


export default class Todo extends LitElement {
	constructor() {
		super();
		this.list = [];
		this.addItem = this.addItem.bind(this);
		this.remove = this.remove.bind(this);
		this.toggleItem = this.toggleItem.bind(this);
	}

	remove(e, index) {
		this.list = [...this.list.slice(0, index), ...this.list.slice(index + 1)];
		this.requestUpdate('list');
		this.save();
	}


	save()
	{
		var str = JSON.stringify(this.list);
		localStorage.setItem("todos", str);
	}

	getTodos(){
		
		var str = localStorage.getItem("todos");
		this.list = JSON.parse(str);

		if(! this.list){
			this.list = [];
		}
	}



	toggleItem(e, index) {
		const list = [...this.list];
		const item = list[index];
		list[index] = Object.assign({}, item, { checked: !item.checked });
		this.list = list;
		this.requestUpdate('list');
	}
	
	addItem(e, text) {

		this.list = [...this.list, { text, checked: false, }];
		this.requestUpdate('list');
		this.save();
	}

	static get styles(){
		return css`
              h1 {

                    text-align: center;
					font-size: 70px;
                    font-weight: 100;
                }
                section {
                    background: #fff;
                    margin: auto;
                    position: relative;
                //    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
                }
                #list-container {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    border-top: 1px solid #e6e6e6;
                }

        `
	}


	render() {
		return html`
         
            <h1></h1>
            <section>
               
                <input-todo @submit="${(e) => this.addItem(e, e.detail)}"></input-todo>
                ${this.list.map((item, index) => html`
                    <todo-item
                        .text=${item.text}
                        .checked=${item.checked}
                        .index=${index}
                        @remove="${(e) => this.remove(e, e.detail)}"
                        @toggle="${(e) => this.toggleItem(e, e.detail)}"
                    ></todo-item>`)}
                <ul id="list-container"></ul>
            </section>`;
	}
}

customElements.define('my-todo', Todo);