const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Saved!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen(`Note ${title} removed!`))
    } else {
        console.log(chalk.bgRed(`No note ${title} found!`))
    }
    
}

const listNotes = () => {
    const notes = loadNotes()
    if(notes.length > 0){
        console.log(chalk.bgCyan("Your Notes:"))
        notes.forEach((note) => {
            console.log(chalk.cyan(note.title))
        })
    }

}

const readNote = (title) => {
    const note = loadNotes().find((note) => note.title === title);
    if(note){
        console.log(chalk.bgCyan(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.bgRed('Note not Found!'))
    }

}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = () => {
    try {
        var dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } catch(e){
        return []
    }
    
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}