import bookshelf from '../db/bookshelf';

//its the table we created
export default bookshelf.Model.extend({ tableName: 'users' })