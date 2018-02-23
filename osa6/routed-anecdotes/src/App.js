import React from "react";
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";

const menuStyle = {
  backgroundColor: 'lightgreen',
  width: 180
}

const activeStyle = {
  backgroundColor: 'orange',
  borderRadius: 25
}
const Menu = () => (
  <div>
      <div style={menuStyle}>
        <NavLink exact to="/" activeStyle={activeStyle}>anecdotes</NavLink>&nbsp;
        <NavLink to="/create" activeStyle={activeStyle}>create new</NavLink>&nbsp;
        <NavLink to="/about" activeStyle={activeStyle}>about</NavLink>&nbsp;
      </div>
  </div>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id}>
      <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
      </li>)}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>. See{" "}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{" "}
    for the source code.
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
  <div>
    <h1>{anecdote.content}</h1>
    <br></br>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
  )
}

const notificationStyle = {
  borderStyle: 'groove',
  borderColor: 'pink',
  color: 'darkgreen',
  backgroundColor: 'orange',
  fontSize: 18,
  fontWeight: 'bold'

}
const Notification = ({ notification }) => {
  return (
  <div>
    {notification !== '' ? 
    <p style={notificationStyle}>{notification}</p>
    :
    <div></div>
    }
  </div>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      author: "",
      info: "",
      redirect: false
    };
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    });
    this.setState({
      redirect: true
    })
  };

  render() {
    return (
      <div>
      {this.state.redirect ? 
      <div>
      <Redirect to="/" />
      </div>
      :
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <div>
            author
            <input
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </div>
          <div>
            url for more info
            <input
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
      }
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: "If it hurts, do it more often",
          author: "Jez Humble",
          info:
            "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
          votes: 0,
          id: "1"
        },
        {
          content: "Premature optimization is the root of all evil",
          author: "Donald Knuth",
          info: "http://wiki.c2.com/?PrematureOptimization",
          votes: 0,
          id: "2"
        }
      ],
      notification: ""
    };
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `a new anecdote ${anecdote.content} created!` });
    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000)
  };

  anecdoteById = (id) => this.state.anecdotes.find(a => a.id === id);

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    return (
      <div>
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <div>
              <Menu />
            </div>
            <Notification notification={this.state.notification} />
            <div>
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route path="/about" render={() => <About />} />
              <Route path="/create" render={() => <CreateNew addNew={this.addNew} />} />
              <Route exact path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            </div>
         </div>
        </Router>
        <Footer />
      </div>
    );
  }
}



export default App;
