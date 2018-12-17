import React, { Component } from 'react';
import { 
    Modal,
    Text, 
    TouchableOpacity, 
    View, 
    StyleSheet,
    TextInput,
    ScrollView,
    AsyncStorage,
    } from 'react-native';

var index = 0
var tempArray = []
export default class Main extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            noteArray: [],
            myArr: [],
            strText: '',
            titleText: '',
            modalVisible: false,
			Array:[],
			lis: [],
        }
    }
    getInitialState(){
        return { myArr: []}
    }
     
    _onPressOut(){
        let temp = index ++
        this.state.myArr.push({'key': temp})
        this.setState({myArr: this.state.myArr})

    }

    arraypush(){
        if(this.state.strText){
        this.state.noteArray.push(this.state.strText)

        }
    }

		tempfunc(){
			let Arr = this.state.myArr.map((a,i) => {
				return(
				<View style = {{flexDirection: 'row'}} key={i}>
				<TextInput
				style = {styles.textsubInput}
                onChangeText= {(strText) => this.setState({strText})}
                placeholder = 'add subtask'
				placeholderTextColor='white'
				underlineColorAndroid='transparent'
				 />
				 <TouchableOpacity key = {i} onPress={() => this.arraypush()} style = {styles.addButton}>
								<Text style = {{color: '#fff',fontSize: 18,}}>
                                ->
                                </Text>
				</TouchableOpacity>
				
				 </View>
				);
		})
		return Arr
		}
		

    render()
    {         
      
        
        return(
          <View style = {styles.container}>

            
			<View style ={styles.footer}>
            
            <Modal animationType = {"slide"} 
                    transparent = {false}
                    visible = {this.state.modalVisible}
                    onRequestClose = {() => { console.log("Modal has been closed.") } }>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style = {styles.modal}>

                <Text style = {{fontSize: 20 ,marginBottom: 20, color: '#d66204', fontWeight:'600'}}>A new ToDo</Text>


                <TextInput
                    style = {styles.textInput}
                    onChangeText= {(titleText) => this.setState({titleText})}
                    placeholder="Title of the Task"
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                >
            
                </TextInput>
            
                <ScrollView style = {{flex: 1}}>
                { this.tempfunc() }
                </ScrollView>
                {/* <TouchableOpacity onPress={() => this.arraypush()} style = {styles.addButton}>
                    <Text style = {{color: '#000',
                        fontSize: 18,}}>Save</Text>
                </TouchableOpacity> */}
            

                <TouchableOpacity onPress={() => this._onPressOut()} style = {{position: 'absolute',
                    right: 20,
                    top: 200,
                    zIndex: 11,
                    backgroundColor: '#d66204',
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: 'center',
                    elevation: 8,}}>
                        <Text style = {styles.addButtonText}>+</Text>
                 </TouchableOpacity>
                
            <TouchableOpacity style = {styles.button} onPress = {this.addNote.bind(this)}>
                <Text style = {{color: 'white'}}> Back </Text>
            </TouchableOpacity>

            </View>
            </ScrollView>   
            </Modal>
      
            </View>
           
					

            <TouchableOpacity onPress = {() => {this.setState({modalVisible: true})}}  style = {styles.button}>
                <Text style = {{color: 'white'}}>New Task</Text>
             </TouchableOpacity>

		<ScrollView style = {styles.scrollContainer}>
           	{
			 this.state.Array.length > 0 ?
				<View>
		{
		 this.state.Array.map((a,i) => 
			{
				return (
				<View key={i} style={{backgroundColor: '#ffe57f', marginBottom: 3 ,}}>
				<Text key={i} style = {{fontSize: 20, fontWeight: '600',color: '#d66204' }}> {a.todoTitle} </Text>  
				<Text key={i} style = {{fontSize: 18}}> {'> '+ a.tasks[0] + '\n ' + '> '+ a.tasks[1] + '\n'} </Text> 
				<TouchableOpacity key = {i} onPress = {this.deletefunc.bind(this, i)} style = {styles.noteDelete} >
            			<Text style = {styles.noteDeleteText}>X</Text>
           			</TouchableOpacity>
				</View>
								 
				 );
			 })
		}
	</View>
	:null
	}
            </ScrollView>

            </View>
        );
    }


   deletefunc(key){
		 alert(key)
		 var delArr = [...this.state.Array];
		 if (index !== -1){
		 delArr.splice(key,1)}
		 this.setState({Array: delArr})
		 console.log(this.state.Array);
	 }
    
    addNote() {
				 if (this.state.titleText) {
				var n = {"todoTitle": this.state.titleText, "tasks": this.state.noteArray};	
        // var newInstance = new Obj( this.state.titleText, this.state.noteArray);
       
        tempArray.push(n);

        AsyncStorage.setItem('key', JSON.stringify(n));

        //console.log(tempArray);
       
       // alert(this.state.Array)
        
        this.setState({     noteArray: [],
                            Array: tempArray,
                            modalVisible: false,
                            myArr: [],
                            titleText: '',
		            strText: '',
			    lis: []
                         })
         
				}
			
        
		}
	   
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        alignItems: this.multiline ? 'flex-start' : 'center',

    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        right: 1,
        left: 1,
        marginTop: 1,

        

    },
    textsubInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 18,
        backgroundColor: '#252525',
        borderTopWidth: 1,
        right: 1,
        left: 1,
        marginTop: 3,
        flexDirection: 'column'
        

    },
    addButton:{
        flexDirection:'column',
        backgroundColor: '#000',
        padding: 18,
        marginTop: 3,
        marginLeft: 5,
        borderTopWidth: 1,
        alignItems: "center",
        justifyContent: 'center',
        

   },
   addButtonText: {
       color: '#fff',
       fontSize: 24,
   },
   modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff5ee',
    padding: 100
 },
   button: {
        position: 'absolute',
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#252525',
        alignItems: "center",
        justifyContent: 'center',
        bottom: 0,
        left:0,
        right:0,
        zIndex: 10,
        padding: 20,
        

		},
	noteDelete: {
			position: 'absolute',
			justifyContent: 'center',
			alignItems: "center",
			backgroundColor: '#B42405',
			padding: 10,
			top: 1,
			bottom: 12,
			right: 10,
	},
	noteDeleteText: {
			color: 'white',
	}


});











