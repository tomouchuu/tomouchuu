var config = require('../../config.js');

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Intro = require('./intro/index.jsx');
var About = require('./about/index.jsx');
var Code = require('./code/index.jsx');

var App = React.createClass({

    getInitialState: function() {
        return {
            me: {
                name: '',
                contact: {}
            },
            twitterData: {
                tweets: []
            },
            instagramData: {
                photos: []
            },
            githubData: {},
            videos: []
        };
    },

    componentDidMount: function() {
        $.ajax({
            url: config.api,
            dataType: 'json',
            cache: true,
            success: function(data) {
                if (this.isMounted()) {
                    this.setState({
                        me: data.me
                    });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        // Get my Instagram Data
        $.ajax({
            url: config.api + '/instagram',
            dataType: 'json',
            cache: true,
            success: function(data) {
                var instagramData = data.photos;
                var item;
                var videos = [];

                for (item of instagramData) {
                    if (item.type === 'video') {
                        videos.push(item.videos.standard_resolution.url);
                    }
                }

                if (this.isMounted()) {
                    this.setState({
                        instagramData: data,
                        videos: videos
                    });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        // Get my Twitter Data
        $.ajax({
            url: config.api + '/twitter',
            dataType: 'json',
            cache: true,
            success: function(data) {
                if (this.isMounted()) {
                    this.setState({
                        twitterData: data
                    });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        // Get my Github Data
        $.ajax({
            url: config.api + '/github',
            dataType: 'json',
            cache: true,
            success: function(data) {

                var githubData = data.slice(0, 10);

                if (this.isMounted()) {
                    this.setState({
                        githubData: githubData
                    });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function() {
        return (
            <div className="react-app">
                <Intro
                    me={ this.state.me }
                    instagramData={ this.state.instagramData }
                    twitterData={ this.state.twitterData }
                    videos={ this.state.videos }
                />
                <About me={ this.state.me } />
                <Code githubData={ this.state.githubData } />
            </div>
        );
    }

});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
