/*
class Persona{
    constructor(nombre, edad, calle) {
        this.nombre = nombre;
        this.edad = edad;
        this.calle = calle;
    }
    hablar(){
        console.log("HOLA SOY "+ this.nombre);
    }
}
const persona1 = new Persona("Homero", 39, "Av. Siempreviva 742");
persona1.hablar();  
*/
/*
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.vendido = false;
    }
    sumaIva() {
        this.precio = this.precio * 1.21;
    }
    vender() {
        this.vendido = true;
    }
}
const producto1 = new Producto("arroz", "125");
const producto2 = new Producto("fideo", "50");
producto1.sumaIva();
producto2.sumaIva();
producto1.vender();
*/

let i;

class Heroe{
    constructor(name,hp,attack_speed,damage,hp_growth,damage_growth,attack_speed_growth,bonus_hp,bonus_damage,bonus_attack_speed,time_rate,total_time){
        this.name = name;
        this.hp = hp;
        this.attack_speed = attack_speed;
        this.damage = damage;
        this.hp_growth = hp_growth;
        this.damage_growth = damage_growth;
        this.attack_speed_growth = attack_speed_growth;
        this.bonus_hp = bonus_hp;
        this.bonus_damage = bonus_damage;
        this.bonus_attack_speed = bonus_attack_speed;
        this.time_rate = time_rate;
        this.total_time = total_time;
    }
    total_hp(){
        if(i%this.time_rate==0&&(i!=0)){
            this.hp = this.hp + this.hp_growth;    
        }
    }
    total_attack_speed(){
        if(i%this.time_rate==0&&(i!=0)){
            this.attack_speed = this.attack_speed + this.attack_speed_growth;
        }
    }
    total_damage(){
        if(i%this.time_rate==0&&(i!=0)){
            this.damage = this.damage + this.damage_growth;    
        }
    }
    bonus_hp_attribute(){
        this.hp = this.hp + this.bonus_hp;
    }
    bonus_damage_attribute(){
        this.damage = this.damage + this.bonus_damage;
    }
    bonus_attack_speed_attribute(){
        this.attack_speed = this.attack_speed + this.bonus_attack_speed;
    }
    attack(enemy_hp,enemy_name){
        let global_damage;
        global_damage = this.damage*this.attack_speed; 
        enemy_hp -= global_damage;
        if(enemy_hp<=0){
            console.log(`${enemy_name} recibió ${global_damage} de daño`)
            enemy_hp = 0;
        } 
        else{
            console.log(`${enemy_name} recibió ${global_damage} de daño`)
        }
        return enemy_hp;
    }
    data(){
        console.log(`${this.name} tiene ${this.hp} de vida, ${this.attack_speed} de velocidad de ataque y ${this.damage} de daño`);
    }
}

const Axe = new Heroe("Adam",1000,3,2,90,3,3,0,0,0,2,20);
const Morphing = new Heroe("Charles",800,4,4,40,5,2,0,0,0,2,20);

console.log("Estadísticas iniciales: ");
Axe.data();
Morphing.data();

for(i=0;i<=Axe.total_time;i++){
    Axe.total_hp();
    Morphing.total_hp();
    Axe.total_attack_speed();
    Morphing.total_attack_speed();
    Axe.total_damage();
    Morphing.total_damage();
    Axe.bonus_hp_attribute();
    Morphing.bonus_hp_attribute();
    Axe.bonus_damage_attribute();
    Morphing.bonus_damage_attribute();
    Axe.bonus_attack_speed_attribute();
    Morphing.bonus_attack_speed_attribute();
    Axe.data();
    Morphing.data();
    Morphing.hp = Axe.attack(Morphing.hp,Morphing.name);
    Axe.hp = Morphing.attack(Axe.hp,Axe.name);
    if((Axe.hp==0)&&(Morphing.hp==0)){
        console.log("¡Empate!");
        break;
    }
    else if(Axe.hp==0){
        console.log(`¡${Axe.name} murió¡`);
        console.log(`¡El ganador es ${Morphing.name}!`);
        break;
    }
    else if(Morphing.hp==0){
        console.log(`¡${Morphing.name} murió¡`);
        console.log(`¡El ganador es ${Axe.name}!`);
        break;
    }
}