import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column('longtext', { nullable: true })
  body: string;
  @CreateDateColumn()
  created: Date;
  @UpdateDateColumn()
  updated: Date;
  @ManyToOne(type => User, user => user.posts)
  user: User;

  @ManyToMany(type => User, user => user.collectedPosts)
  collectedUsers: User[];

  @ManyToOne(type => Category, category => category.posts)
  category: Category;
  // Tag多对多关系
  @ManyToMany(type => Tag, tag => tag.posts)
  @JoinTable({ name: 'posts_tags' })
  tags: Tag[];
  // Comment的一对多关系
  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
}
