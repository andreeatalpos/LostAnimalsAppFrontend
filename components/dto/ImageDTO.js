export default class ImageDTO {
  constructor(description, file) {
    this.description = description;
    this.file = file;
  }

  toJSON() {
    return {
      description: this.description,
      file: this.file,
    };
  }
}
