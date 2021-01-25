export class Language {
  userId: number
  id: number
  title: string
  completed: Boolean

  getLanguage(){
    console.log(this.userId+" "+this.title);
  }

}
