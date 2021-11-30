import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './componenets/search_bar';
import VideoList from './componenets/video_list';
import VideoDetail from './componenets/video_detail';
import YTSearch from 'youtube-api-search';


const API_KEY = 'AIzaSyDXMy_PYSbTzC3eAaRf6eHC1VMbHE9O74Q';



class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');

        
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0] 
            });
        });
    }

    render(){

        const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300)
        return(
            <div>

                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            
            </div>
        );
    }

}

//take this component generated html and put it on page(in DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
