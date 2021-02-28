<template>
    <div class="container">
        <div>
            <div class="row mx-0">
                <div class="col-md-6 col-12 p-0 pr-1">
                    <div class="card todos mt-5">
                        <div class="card-body  w-100">
                            <div class="time">
                                <div class="date row mx-0">
                                    <span class="day col-6 p-0">
                                        12
                                    </span>
                                    <span class="test col-6 row mx-0  align-items-center p-0">
                                        <span class="col-12 p-0">
                                            JAN 
                                            <div class="text-muted w-100">2016</div>
                                        </span>
                                        
                                    </span>

                                </div>
                            </div>
                            <table class="w-100">
                                <tr v-for="item in todos" v-bind:key="item.index">
                                    <td>{{item.subject}}</td>
                                    <td class="row mx-0 justify-content-end">
                                        <button v-bind:class="item.id +'-ready-btn ready-btn'"
                                            v-on:click="completedTodo(item.id)"><i class="fas fa-check"></i></button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <button data-toggle="modal" data-target="#addModal" class="add-modal">+</button>
                    </div>
                </div>
                <div class="col-md-6 col-12 p-0">
                    <div class="card mt-5">
                        <div class="card-body w-100">
                            <h2><i class="fas fa-clipboard-check"></i> DONE</h2>
                            <table class="w-100 mt-3">
                                <tr  v-for="item in ready" v-bind:key="item.index">
                                    <td>{{item.subject}}</td>
                                    <td class="row mx-0 justify-content-end"><button v-on:click="deleteTodo(item.id)" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="modal fade " id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content ">
      <div class="modal-body p-4">
                    <input class="form-control mb-4" placeholder="@subject" v-model="item.subject" type="text">
                    <button class="add-btn btn btn-success form-control" v-on:click="addItem()">Add todo</button>
      </div>
    </div>
  </div>
</div>
    </div>
    
</template>
<script>
    export default {
        data: () => {
            return {
                item: {
                    subject: ""
                },
                todos: [],
                ready: [],

            }
        },
        created() {
            this.getTodos();
            this.getReady();
        },
        methods: {
            addItem() {
                const button = document.querySelector('.add-btn');
                button.setAttribute('disabled', 'enabled');
                axios.post('/api/item/store', {
                        subject: this.item.subject
                    })
                    .then(response => {
                        if (response.status = 201) {
                            this.getTodos();
                            this.item.subject = '';
                            button.removeAttribute('disabled');
                        }
                    });
            },
            getTodos() {
                axios.post('/api/todos').then(response => {
                    this.todos = response.data;
                });
            },
            getReady() {
                axios.post('api/done').then(response => {
                    this.ready = response.data
                });
            },
            completedTodo(id) {
                const test = `${id}-ready-btn`;
                const button = document.getElementsByClassName(test)[0];
                button.setAttribute('disabled', 'enabled');
                axios.post('/api/update', {
                    id: id
                }).then(response => {
                    if (response.data == true) {
                        this.getTodos();
                        this.getReady();
                        button.removeAttribute('disabled');
                    }
                })
            },
            deleteTodo(id) {
                axios.post('/api/item/destroy/' + id, ).then(response => {
                    if (response.data == true) {
                        this.getReady();
                    }
                })
            }
        }
    }

</script>
<style scoped>
    .date{
        max-width: 90px;
    }
    .date .day{
        /* word-break: normal; */
        font-size: 35px;
        padding:0px !important;
    }
    .test{
        font-size: 10px;
    }
    .todos{
        position: relative;
        
    }
    .week-day{
        position: absolute;
        /* top: 50%; */
        top: 40px;
        font-weight: bold;
        right: 10px;
    }
    .ready-btn{
        border-radius: 50%;
        padding: 10px 15px;
        border: none;
        box-sizing: border-box;
        background: transparent;
        border: 1px solid #edeff4;
        transition: 300ms all;
        color: black;
    }
    .ready-btn:hover{
        border-color: black;
    }
    .card{
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border: none;
    }
    .add-modal{
        color: #ecf0f1;
        background: #50e3a4;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        box-sizing: border-box;
        padding: 25px !important;
        font-size: 40px;
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
    }
    td{
        padding-bottom: 20px;
    }
    .delete-btn{
            border-radius: 50%;
        padding: 10px 15px;
        border: none;
        box-sizing: border-box;
        background: transparent;
        border: 1px solid;
        transition: 300ms all;
        color: black;
    }
</style>
