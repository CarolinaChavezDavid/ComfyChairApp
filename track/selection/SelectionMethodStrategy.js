class SelectionMethodStrategy {
    getType() {
        throw new Error("El método 'getType()' debe ser implementado.");
      }

      executeMethod(publications){
        throw new Error("El método 'executeMethod()' debe ser implementado.");
      }
}

module.exports = SelectionMethodStrategy;