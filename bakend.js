class Contador {
    static cuentaGeneral = 0;

    constructor(responsable) {
        this.responsable = responsable;
        this.cuentaPersonal = 0;
    }
    getResponsable() {
        return this.responsable;
    
    } 
    
    getCuentaIndividual() {
     return this.cuentaPersonal;
    }

    getCuentaGobla() {
        return Contador.cuentaGeneral;

    }

contar() {
    this.cuentaPersonal += 1;
    Contador.cuentaGeneral += 1;

}


}



const responsable1 = new Contador('Carlos');
const responsable2 = new Contador('Carolina');

responsable1.contar();
responsable2.contar();
responsable1.contar();

console.log(responsable1.getResponsable());
console.log(responsable2.getResponsable());
console.log(responsable1.getCuentaGobla());



