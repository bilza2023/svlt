
class Table {

constructor(sequalizeModel){
this.seqTable = sequalizeModel; 
}
//------------------CREATE----------------------------------
async  create(data) {
  try {
    const seqItem = await this.seqTable.create(data);
    // const item = seqItem.map(r => r.toJSON());  
    const item = seqItem.toJSON();
    return item;
  } catch (error) {
    console.error(`Failed to create new record. Error: ${error}`);
  }
}
//------------------READ----------------------------------
async  read(id) {
  try {
    const seqItem = await this.seqTable.findByPk(id );
    if (seqItem) {
      const item = seqItem.toJSON();  
      return item;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Failed to fetch item with ID ${id}. Error: ${error}`);
  }
}
//------------------UPDATE----------------------------------
async  update(id, data) {
  try {
    const seqItem = await this.seqTable.update(data, { where: { id: id } });
    const item = seqItem.map(r => r.toJSON());
    return item;
  } catch (error) {
    console.error(`Failed to update item with ID ${id}. Error: ${error}`);
  }
}
//------------------Del----------------------------------
async  del(id) {
  try {
    const deletedCount = await this.seqTable.destroy({ where: { id: id } });
    if (deletedCount) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Failed to delete ID ${id}. Error: ${error}`);
  }
}
//------------------READ ALL-----------------------------
async  readAll() {
  try {
    const seqItem = await this.seqTable.findAll();
    if (seqItem) {
      const item = seqItem.map(r => r.toJSON());  
    //   console.log(item);
      return item;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Failed to fetch items. Error: ${error}`);
  }
}
//------------------READ ALL-----------------------------
async where(data) {
  try {
    const seqItems = await this.seqTable.findAll({ where: data });
    if (seqItems) {
      const items = seqItems.map(r => r.toJSON());
      return items;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Failed to fetch items with provided args. Error: ${error}`);
  }
}//--where
}//--user class ends


module.exports = Table;