import React, { PureComponent } from 'react'
import Styles from './App.module.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNews } from './redux/actions'


class App extends PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      currentOption: ''
    }
  }

  handleClick = optionName => () => {
    this.props.getNews(optionName)
    this.setState({ currentOption: optionName })
  }

  getOptions() {
    return [{optionName: "frontend", id: 1}, {optionName: "reactjs", id: 2}, {optionName: "vuejs", id: 3},  {optionName: "angular", id: 4}]
  }

  isOptionActive(optionName) {
    return this.state.currentOption === optionName
  }

  render() {
    const options = this.getOptions()
    const { randomNews } = this.props;

    return (
      <div className={Styles.app}>
        Please, select subreddit
        <ul className={Styles.container}>
          {options && options.map(({optionName, id}) => {
            return (
              <div className={Styles.buttonContainer} key={id}>
                <button className={this.isOptionActive(optionName) ? Styles.optionActive : Styles.option} onClick={this.handleClick(optionName)}>{optionName}</button>
              </div>
            )
          }
          )}
        </ul>
        <div className={Styles.linkContainer}>
          {this.props.isFetching && (<span>loading...</span>)}
          {randomNews && (<a className={Styles.link} href={randomNews.data.url}>{this.props.currentOption}:&nbsp;{randomNews.data.title}</a>)}
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  news: state.all,
  randomNews: state.randomNews,
  isFetching: state.isFetching,
  currentOption: state.currentOption
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getNews,
  }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

