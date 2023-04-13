export const getValorEstado = (estado) => {
    if (estado === 'Calificado') 
        return 1;
    
    if (estado === 'Entregado')
        return  2;
    if (estado === 'Asignado')
        return 3;

    return 2;
}