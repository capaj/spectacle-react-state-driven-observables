// Import React
import React from 'react'

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from 'spectacle'
import AlertContainer, {alerts} from '../assets/alert-container'

import TweetEmbed from '../assets/tweet'
import BoundInput from '../assets/bound-input'
import {observable} from 'mobservable'
import {observer} from 'mobservable-react'

// Import image preloader util
import preloader from 'spectacle/lib/utils/preloader'

// Import theme
import createTheme from 'spectacle/lib/themes/default'

// Import custom component
import Interactive from '../assets/interactive'

// Require CSS
require('normalize.css')
require('spectacle/lib/themes/default/index.css')

const images = {
  city: require('../assets/city.jpg'),
  kat: require('../assets/kat.png'),
  logo: require('../assets/formidable-logo.svg'),
  markdown: require('../assets/markdown.png')
}

preloader(images)

const theme = createTheme({
  primary: '#FF9955',
  maxWidth: 1200
})

const state = observable({inputDemo: 0})

class Presentation extends React.Component {
  render () {
    return (
      <Spectacle theme={theme}>
        <Deck transition={['zoom', 'slide']} transitionDuration={500}>
          <Slide transition={['zoom']} bgColor='primary'>
            <Heading size={1} fit caps lineHeight={1} textColor='black'>
              ReactJS and state driven observables with
            </Heading>
            <img src='https://camo.githubusercontent.com/6ae1648cc96403ad577a72ae87da990121578892/68747470733a2f2f6d776573747374726174652e6769746875622e696f2f6d6f627365727661626c652f696d616765732f6d6f627365727661626c652e706e67'></img>
            <Heading size={1} fit caps>
              Mobservable
            </Heading>
            <Link href='https://github.com/capaj/spectacle-react-state-driven-observables'>
              <Text bold caps textColor='tertiary'>View on Github</Text>
            </Link>
            <Link href='https://github.com/FormidableLabs/spectacle-boilerplate'>
              <Text textSize='0.5em' margin='50px 20px 0px' bold>done in spectacle</Text>
            </Link>
          </Slide>
          <Slide transition={['slide']} bgColor='black' notes="react is like a 'cache' which needs to get invalidated. Most popular library for doing that is redux.">
            <BlockQuote>
              <Quote>There are only two hard things in Computer Science: cache invalidation and naming things.</Quote>
              <Cite>Phil Karlton</Cite>
            </BlockQuote>
          </Slide>
          <Slide transition={['slide']} notes='by definition, I would expect it to be mutable'>
            <Image src={images.kat.replace('/', '')} margin='0px auto 40px' height='293px'/><br/>
            <Heading size={8} caps textColor='secondary' bgColor='white' margin={10}>
              What is a state?
            </Heading>
            <Appear>
              <Heading size={1} caps fit textColor='secondary'>
                an object in memory which is mutated by user input
              </Heading>
            </Appear>
            <Appear>
              <List textSize={30}>
                <ListItem textSize={30}>redux/flux like approach is to put all mutations into one place; the root pointer to the current state tree which is swapped upon each mutation. These are really coarse grained mutations</ListItem>
                <ListItem textSize={30}>immutable state is fallacy</ListItem>
                <ListItem textSize={30}>immutable state forces you to put mutations in one place and name them-hence we have "actions"; then you have to map actions to reducers</ListItem>
                <ListItem textSize={30}>mobservable allows you to put small understandable mutations of your state inside your components-neck and neck with input event handlers</ListItem>
              </List>
            </Appear>
          </Slide>
          <Slide>
            <CodePane source={`
              <button onClick={() => {
                dispatch(addTodo(input.value))
              }}>
                  `}/>
                <Text>Versus</Text>
              <CodePane source={`
            <button onClick={() => {
              todos.push(input.value)
            }}>
                `}/>
          </Slide>
          <Slide transition={['slide']} notes='api description'>
            <Heading>
              API
            </Heading>

              <Heading size={8} caps textColor='secondary' bgColor='white' margin={10}>
                core
              </Heading>
              <List>
                <Appear><ListItem>observable</ListItem></Appear>
                <Appear><ListItem>autorun</ListItem></Appear>
              </List>

              <Heading size={8} caps textColor='secondary' bgColor='white' margin={10}>
                Advanced
              </Heading>
              <List textSize={30}>
                <ListItem textSize={30}>autorunAsync</ListItem>
                <ListItem textSize={30}>autorunUntil</ListItem>
                <ListItem textSize={30}>createTransformer</ListItem>
                <ListItem textSize={30}>expr</ListItem>
                <ListItem textSize={30}>extendObservable</ListItem>
                <ListItem textSize={30}>fastArray</ListItem>
                <ListItem textSize={30}>isObservable</ListItem>
                <ListItem textSize={30}>map</ListItem>
                <ListItem textSize={30}>observe</ListItem>
                <ListItem textSize={30}>modifiers(asReference, asStructure, asFlat)</ListItem>
              </List>
          </Slide>
          <Slide transition={['slide']}>
            <Appear fid='1'>
              <Heading size={1} caps fit textColor='secondary'>
                Autorun lab sample
              </Heading>
            </Appear>
            <Appear fid='2'>
            <CodePane
              lang='js'
              source={require('raw!../assets/autorun.js')}
              margin='20px auto'
            />
            </Appear>
          </Slide>
          <Slide transition={['slide']}>
            <Heading size={1} caps fit textColor='secondary'>
              Autorun real-life example
            </Heading>
            <Appear fid='1'>
            <CodePane
              lang='jsx'
              source={require('raw!../assets/stored-observable.example')}
              margin='20px auto'
            />
            </Appear>
          </Slide>
          <Slide transition={['zoom', 'fade']} bgColor='primary' notes='stateless component having a state'>
            <Heading size={1} textColor='tertiary'>
              Alert container
            </Heading>
            <CodePane
              lang='jsx'
              source={require('raw!../assets/alert-container.example')}
              margin='20px auto'
            />
          </Slide>
          <Slide>
            <AlertContainer/>
            <CodePane
              lang='jsx'
              source={require('raw!../assets/alerts-useage.example')}
              margin='20px auto'
            />
            <button onClick={() => {
              alerts.add({html: 'Added at: ' + new Date()})
            }} style={{marginRight: 30}}>Add Alert 'Added at: ' + new Date()</button>
            <button onClick={() => alerts.clear()}>Clear</button>
          </Slide>
          <Slide transition={['zoom', 'fade']} bgColor='primary'>
            <Heading size={1} fit textColor='secondary'>
              Where to use <pre style={{display: 'inline'}}>React.createClass</pre>, ES6 Classes and where just plain stateless functional components?
            </Heading>
            <img src='http://i.imgur.com/OKsMj2f.gif'></img>
            <Appear fid='1'>
              <Text textSize={20} textColor='tertiary'>
                I always transpile, so I never use React.createClass
              </Text>
            </Appear>
              <Layout>
                <Appear fid='2'>
                <Fill>
                  <Heading size={8} caps textColor='secondary' bgColor='white' margin={10}>
                    stateless functional components
                  </Heading>
                  <List>
                    <Appear><ListItem>Any component which is displayed only once</ListItem></Appear>
                    <Appear><ListItem>can actually be statefull with mobservable</ListItem></Appear>
                  </List>
                </Fill>
                </Appear>
                <Appear fid='3'>
                <Fill>
                  <Heading size={8} caps textColor='secondary' bgColor='white' margin={10}>
                    ES6 Classes
                  </Heading>
                  <List>
                    <Appear><ListItem>Any component which is displayed only multiple times at once</ListItem></Appear>
                    <Appear><ListItem>if a component needs lifecycle methods</ListItem></Appear>
                  </List>
                </Fill>
                </Appear>
              </Layout>
          </Slide>
          <Slide transition={['zoom', 'fade']} bgColor='primary' notes=''>
            <Heading size={1} textColor='tertiary'>
              Bound input
            </Heading>
            <CodePane
              lang='jsx'
              source={require('raw!../assets/bound-input.example')}
              margin='20px auto'
            />
          </Slide>
          <Slide>
            <Heading size={1} textColor='tertiary'>
              Bound input demo
            </Heading>
            <CodePane lang='jsx'
              source={require('raw!../assets/input-usage.example')}
              margin='20px auto'/>
            <Text>{state.inputDemo}</Text>
            <BoundInput source={state} name='inputDemo' type='number'/>
          </Slide>
          <Slide transition={['fade']} bgColor='secondary' textColor='primary'>
            <Heading caps fit size={1} textColor='tertiary'>
              So in few bullet points
            </Heading>
            <List>
              <Appear><ListItem>you don't have to act as a message broker between react and your state(unlike in Flux)</ListItem></Appear>
              <Appear><ListItem>you can leverage ES5 features for simpler code with great performance</ListItem></Appear>
              <Appear><ListItem>you can achieve greater modularity of your components</ListItem></Appear>
              <Appear><ListItem>be DRYer and KISSer</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={['spin', 'slide']} bgColor='tertiary'>
            <Heading size={1} caps fit lineHeight={1.5} textColor='primary'>
              Questions?
            </Heading>
            <Text textSize={15}>Made with love in Brno/London by</Text>
            <Link href='https://github.com/capaj'>Jiří Špác alias Capaj</Link>
          </Slide>
        </Deck>
      </Spectacle>
    )
  }
}

export default observer(Presentation)
