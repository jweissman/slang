class AstNode {
  constructor(elements) {
    this.elements = elements
  }

  get derive() {
    console.warn("Implement derive for", this)
    throw new Error("AstNode.derive is abstract")
  }
}

module.exports = AstNode
