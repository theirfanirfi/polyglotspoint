import Builder from './Builder'
export default class SentenceLessonBuilder extends Builder {

    constructor(lesson) {
        super(lesson);
        this.lesson = lesson;
        this.isReady = false;
    }

    render() {
        return null;
    }

    splitSentence() {
        this.words = this.lesson.lesson.sentence.split(" ")
        return this;
    }
    splitTranslation() {
        let translation = this.lesson.lesson.translation
        this.correct_sentence = translation != undefined ? translation.split(" ") : undefined;
        return this;
    }

    makeSentence() {
        this.sentence = this.lesson.lesson.sentence.replace("-", " ");
        return this;
    }

    formSentenceWithWordsDropDown() {
        for (let word in this.words) {
            let dd = this.lesson.dropdown[this.words[word]]
            if (dd != undefined) {
                this.dropdown = dd.split(";")
            }
        }

        return this;
    }

    getDropDownOfWord(word) {
        return this.lesson.dropdown[this.words[word]]
    }

    makeTranslation() {
        this.translation = this.lesson.lesson.translation
        return this;
    }

    makeTags() {
        this.tags = this.lesson.lesson.translation.split(" ")
        this.tags = this.shuffleArray(this.tags);
        return this;
    }

    shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    lengthOfCorrectSentence() {
        this.correct_sentence_length = this.tags != undefined ? this.tags.length : 0;
        return this;
    }

    build() {
        this.isReady = true;
        return this;
    }


}