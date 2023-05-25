//  $('#myModal').modal(options)


const vinculo = document.querySelector('.form-select');
const titulo = document.querySelector('#titulo');
const autor = document.querySelector('#autor');
const edicao = document.querySelector('#edicao');
const issn = document.querySelector('#issn');
const dataFab = document.querySelector('#dataFab');
const editora = document.querySelector('#editora');
const btnSoli = document.querySelector('.solicitar');
const vesBOOK = document.querySelector('.vesBOOK');
const tbody = document.querySelector('#tbody');
const modal = document.querySelector('#mymodal');
var display = document.querySelector('.clock');
var intervals;


class BOOK{
    constructor(){
        this.id=1;
        this.arrayBook = [];
        this.editID = null;
    }
    handleSave(){
        let book = this.load();
        if(this.formValid(book)) {
            if(this.editID === null){
                this.handleADD(book);
            }else{
                this.handleUpdate(this.editID, book);
            }
        }
        this.tableList();
        this.handleClear();
        this.stopTimer(intervals);
    }
    load(){
        let book = {}
            book.id = this.id
            book.vinculo = String(vinculo.value); 
            book.titulo = titulo.value; 
            book.autor = autor.value; 
            book.edicao = edicao.value; 
            book.issn = issn.value;  
            book.dataFab = dataFab.value; 
            book.editora = editora.value; 
        return book;

    }
    formValid(book){
        let msg = '';
        if(book.vinculo === 'Selecione') msg += 'Selecione uma opção de vinculo .\n';
        if(book.titulo === '') msg += 'Campo titulo não preenchido .\n';
        if(book.autor === '') msg += 'Campo autor não preenchido .\n';
        if(book.edicao === '') msg += 'Campo edição não preenchido .\n';
        if(book.issn === '') msg += 'Campo ISSN não preenchido .\n';
        if(book.dataFab === '') msg += 'Campo data de publicação não preenchido .\n';
        if(book.dataFab.split("-")[0] < 1900 || book.dataFab.split("-")[0] > 2023) msg += 'Data invalida .\n';
        if(book.editora === '') msg += 'Campo editora não preenchido .\n';

        if(msg != ''){
            alert(msg);
            return false;
        }
        return true;
    }
    handleADD(book){
        this.arrayBook.push(book);
        this.id++;

    }
    tableList(){
        tbody.innerText='';
        for(let i = 0;i< this.arrayBook.length; i++){
            let tr = tbody.insertRow();
            // let td_id = tr.insertCell();
            let td_vinculo= tr.insertCell();
            let td_titulo = tr.insertCell();
            let td_autor = tr.insertCell();
            let td_edicao = tr.insertCell();
            let td_issn = tr.insertCell();
            let td_dataFab = tr.insertCell();
            let td_editora = tr.insertCell();
            let edit = tr.insertCell();
            let trash = tr.insertCell();
            // td_id.innerText = this.arrayBook[i].id;
            td_vinculo.innerText = this.arrayBook[i].vinculo;
            td_titulo.innerText = this.arrayBook[i].titulo;
            td_autor.innerText = this.arrayBook[i].autor;
            td_edicao.innerText = this.arrayBook[i].edicao;
            td_issn.innerText = this.arrayBook[i].issn;
            td_dataFab.innerText = this.arrayBook[i].dataFab;
            td_editora.innerText = this.arrayBook[i].editora;
        

            let btnEdit = document.createElement('button');
            let btnTrash = document.createElement('button');

            let textEdit = document.createTextNode("edit");
            let textTrash = document.createTextNode("delete");

            btnEdit.classList.add('btn')
            btnTrash.classList.add('btn')

            btnEdit.classList.add('btn-primary')
            btnTrash.classList.add('btn-danger')

            btnEdit.appendChild(textEdit)
            btnTrash.appendChild(textTrash);

            edit.appendChild(btnEdit);
            trash.appendChild(btnTrash)

            edit.setAttribute("onclick","book.handleEdit("+JSON.stringify(this.arrayBook[i])+")");
            trash.setAttribute("onclick","book.handleDelete("+this.arrayBook[i].id+")");

            // td_id.classList.add('text-center');
            td_vinculo.classList.add('text-center');
            td_titulo.classList.add('text-center');
            td_autor.classList.add('text-center');
            td_edicao.classList.add('text-center');
            td_issn.classList.add('text-center');
            td_dataFab.classList.add('text-center');
            td_editora.classList.add('text-center');

            
        }
    }
    handleClear(){
        vinculo.value = 'Selecione';
        titulo.value = '';
        autor.value = '';
        edicao.value = '';
        issn.value = ''; 
        dataFab.value = '';
        editora.value = '';

        btnSoli.innerText= 'Solicitar';
        this.editID = null;
        this.stopTimer(intervals);
    }
    handleDelete(id){
        if(confirm('Deseja realmente deletar o livro solicitado?')){
            for(var i=0;i< this.arrayBook.length ; i++){
                if(this.arrayBook[i].id === id) {
                    this.arrayBook.splice(i,1);
                    tbody.deleteRow(i);
                }
            }

        }
    }
    handleEdit(data){
        this.editID = data.id;
        btnSoli.innerText= 'atualizar';
        vesBOOK.click();
        vinculo.value = data.vinculo;
        titulo.value = data.titulo;
        autor.value = data.autor;
        edicao.value = data.edicao;
        issn.value = data.issn;
        dataFab.value = data.dataFab;
        editora.value = data.editora;
    }
    handleUpdate(id, data){
        for(var i = 0; i< this.arrayBook.length;i++){
            if(this.arrayBook[i].id == id ){
              this.arrayBook[i].id = data.id;
              this.arrayBook[i].vinculo = data.vinculo;
              this.arrayBook[i].titulo =  data.titulo;
              this.arrayBook[i].autor =  data.autor;
              this.arrayBook[i].edicao =  data.edicao;
              this.arrayBook[i].issn = data.issn;
              this.arrayBook[i].dataFab = data.dataFab;
              this.arrayBook[i].editora = data.editora;
            }
        }
    }
    startTimer(duration, display){
        var timer = duration, minutes, seconds;

       let interval = setInterval(()=>{
            minutes= parseInt(timer / 60, 10);
            seconds= parseInt(timer % 60, 10);
            minutes= minutes < 10 ? '0' + minutes : minutes;
            seconds= seconds < 10 ? '0' + seconds : seconds;

            display.innerHTML = `${minutes} : ${seconds}`;
            timer-=1;
            if(timer<0){
                this.stopTimer(interval);
                vinculo.disabled = true;
                titulo.disabled = true;
                autor.disabled = true;
                edicao.disabled = true;
                issn.disabled = true;
                dataFab.disabled = true;
                editora.disabled = true;
                alert('formulário esgotado! \n abra novamente para preencher os campos \n ou envie se o formulário estiver completo.');
            }
        },1000);
        intervals = interval;
    }
    configurations(){
        display.innerHTML = '60:00'
        vinculo.disabled = false;
        titulo.disabled = false;
        autor.disabled = false;
        edicao.disabled = false;
        issn.disabled = false;
        dataFab.disabled = false;
        editora.disabled = false;
        var duration = 60 * 60 ; //consersão para segundos
        this.startTimer(duration, display);
}   
    stopTimer(interval){
        clearInterval(interval);
        display.innerHTML = '00:00'
    }
}

var book = new BOOK();