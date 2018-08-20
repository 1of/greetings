/*jshint ignore:start */
'use strict';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      comments: [
        {name: 'Самуил', text: "Привет, Верунь! ниче себе ты крутая. фотка класс!!!!", date: '2011-01-26T13:51:50.417Z'},
        {name: 'Лилия Семёновна', text: "Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент, это и есть всемирно известный центр огранки алмазов и торговли бриллиантами", date: '2011-08-26T13:51:50.417Z'},
        {name: 'Лилия Семёновна', text: "Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент?", date: '2013-01-26T13:51:50.417Z'},
      ],
      likes: 146,
      liked: false,
      message: '',
      toggleShowComments: false
     };
   this.addLike = this.addLike.bind(this);
   this.showAllComments = this.showAllComments.bind(this);
   this.addComment = this.addComment.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.validKey = this.validKey.bind(this);
   this.showAll = this.showAll.bind(this);
   this.showLast = this.showLast.bind(this);
  }

//Поставить лайк
  addLike() {
  this.state.liked === false ? this.setState({likes: this.state.likes+1, liked: true }) : this.setState({likes: this.state.likes-1, liked: false });
  };
//Вывод всех комментариев
  showAllComments() {
    //для отображения даты
    var options = {year: 'numeric', month: 'long',day: 'numeric', timezone: 'UTC' };

    let commentsArr = this.state.comments;
    if (commentsArr.length > 3 && this.state.toggleShowComments == false) {
      commentsArr = this.state.comments.slice(this.state.comments.length - 3);
      } else if (commentsArr.length > 3 && this.state.toggleShowComments == true) {
        commentsArr = this.state.comments;
        };
    
    return commentsArr.map((user, i) => {
      return <div className="single-comment" key={i}>
                <span className="name-item"> {user.name}</span> <span className="date"> {new Date(user.date).toLocaleString("ru", options)}</span>
                <div className="comment-text">
                  {user.text}
                </div>				
            </div>	
    });
  };

//Отправить комментарий
addComment(event) {
  event.preventDefault();
  if (this.state.message.length == 0) return;

  let newComment = {name: "Неизвестный", text: this.state.message, date: new Date().toISOString()};
  let newCommentsArr = this.state.comments;
  newCommentsArr.push(newComment);
  this.setState({comments: newCommentsArr, message: ''});

};

//показать все комментарии
showAll() {
  this.setState({toggleShowComments: true});
}
//показать часть комментариев
showLast() {
  this.setState({toggleShowComments: false});
}
//сообщение
handleChange(event) {
  this.setState({message: event.target.value});
}
//отправка по Ctrl + Enter
validKey(event){
  if(event.ctrlKey && event.keyCode == 13) {
  this.addComment(event);
  }
}

  render() {
    return (
      <div className="user-comments">
			<div className="reviews-stat">
				<span className="last-txt" onClick={this.showLast}>Последние отзывы</span> 
             <a href="#" className="all-txt" onClick={this.showAll}>Все отзывы </a>  
        <span className="comm-stat like"> <img onClick={this.addLike} src="assets/images/like.png"/>{this.state.likes}</span> 
        <span className="comm-stat"><img src="assets/images/comment.png"/> {this.state.comments.length}</span>
			</div>
			<div className="comments-list">

        {this.showAllComments()}

			</div>
			<form className="send-area" onSubmit={this.addComment}>
          <textarea value={this.state.message} onChange={this.handleChange} onKeyDown={this.validKey}></textarea>
          <button type="submit" onClick={this.addComment}>Написать консультанту</button>	
			</form>		
		</div>
    );
  }
}

let domContainer = document.querySelector('#root');
ReactDOM.render(<Comments />, domContainer);
/*jshint ignore:end */