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
            // let dd = this.lesson.dropdown[this.words[word]]
            let dd = this.lesson.dropdown[word]
            if (dd != undefined) {


                var dropdownwords = dd[this.words[word]]
                var wd = this.words[word]
                // console.log(wd)
                // this.dropdown[wd] = dropdownwords.split(";")
                // this.dropdown['sound'] = dd['sound']
                this.dropdown = { wd: dropdownwords.split(";"), 'sound': dd['sound'] }
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
        this.tags = this.lesson.lesson.is_type_answer == 0 ? this.shuffleArray(this.tags) : this.tags;
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