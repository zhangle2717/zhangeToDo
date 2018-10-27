(function (window, Vue) {
		// var list = [{ content: 'a', id: 1, isFinish: false },
		// { content: 'b', id: 2, isFinish: true },
		// { content: 'c', id: 3, isFinish: false },]
	new Vue({
		el: "#app",
		data: {
			list: JSON.parse(window.localStorage.getItem('list'))||[],
			setVal: "",
		},
		methods: {
			addVal() {
				if(!this.setVal.trim())return
				this.list.push({
					content: this.setVal,
					id: this.list.length ? this.list.sort((a,b) => a.id - b.id).slice(this.list.length - 1,)[0].id + 1 : 1,
					isFinish: false
				}),
				this.setVal="";
			},
			dele(index){
				this.list.splice(index,1)
			},
			deleAll(){
			this.list=	this.list.filter((e)=>e.isFinish===false);
			}
		},
		//设置自定指令
		directives: {
			foucs: {
				inserted(el) {
					el: focus();
				}
			}
		},
		computed:{
			numb(){
			return	this.list.filter((e)=>e.isFinish==true).length;
			},
			//计算属性的完整版的写法
			newAll:{
				get(){
					return this.list.filter(e=>e.isFinish==true).length ===this.list.length;
				},
				set(val){
						return	this.list.filter(e=>e.isFinish=val);
				}
			}
		},
		//侦听器完整版写法
		watch:{
			list:{	
				handler(newArr){

					window.localStorage.setItem('list',JSON.stringify(newArr))
				},
				deep:true
			},
			
		}
	})

})(window, Vue);
