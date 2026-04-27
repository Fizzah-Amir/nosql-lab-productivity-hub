// seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  
  const hash1 = await bcrypt.hash('password123', 10);
  const hash2 = await bcrypt.hash('hunter2', 10);

  const u1 = await db.collection('users').insertOne({
    email:        'alice@example.com',
    passwordHash: hash1,
    name:         'alice',
    createdAt:    new Date('2024-01-10'),
  });

  const u2 = await db.collection('users').insertOne({
    email:        'bob@example.com',
    passwordHash: hash2,
    name:         'Bob',
    createdAt:    new Date('2024-02-01'),
  });

  const aliceId = u1.insertedId;
  const bobId   = u2.insertedId;

 
  const p1 = await db.collection('projects').insertOne({
    userId:      aliceId,
    name:        'My FYP',
    description: 'final proj on db',
    archived:    false,
    color:       '#6366f1',            
    createdAt:   new Date('2024-01-15'),
  });

  const p2 = await db.collection('projects').insertOne({
    userId:    aliceId,
    name:      'Personal Blog',
    archived:  false,
    createdAt: new Date('2024-02-20'),
  });

  const p3 = await db.collection('projects').insertOne({
    userId:      bobId,                 
    name:        'E-Commerce Redesign',
    description: 'Redesigning the checkout flow for the client',
    archived:    false,
    color:       '#f97316',           
    createdAt:   new Date('2024-03-01'),
  });

  const p4 = await db.collection('projects').insertOne({
    userId:    bobId,
    name:      'Old Marketing Site',
    archived:  true,                    
    createdAt: new Date('2023-11-01'),
  });

  const fyp   = p1.insertedId;
  const blog  = p2.insertedId;
  const ecomm = p3.insertedId;
  
  await db.collection('tasks').insertMany([
    
    {
      userId:    aliceId,              
      projectId: fyp,
      title:     'write now ',
      status:    'in progress',
      priority:  5,
      tags:      ['writing', 'research'],
      subtasks:  [
        { title: 'go',    done: true  },
        { title: 'fo', done: false },
        { title: 'wo',  done: false },
      ],
      dueDate:   new Date('2024-04-30'), 
      createdAt: new Date('2024-01-20'),
    },
    {
      userId:    aliceId,
      projectId: fyp,
      title:     'w1',
      status:    'done',
      priority:  4,
      tags:      ['setup', 'devops'],
      subtasks:  [
        { title: 'a5',      done: true },
        { title: 'a6',   done: true },
      ],
      
      createdAt: new Date('2024-01-25'),
    },
    {
      userId:    aliceId,
      projectId: fyp,
      title:     'Run baseline benchmarks',
      status:    'todo',
      priority:  3,
      tags:      ['research', 'benchmarks'],
      subtasks:  [
        { title: 'a7',      done: false },
        { title: 'a8',  done: false },
      ],
      dueDate:   new Date('2024-05-15'),
      createdAt: new Date('2024-02-01'),
    },
    {
      userId:    aliceId,
      projectId: fyp,
      title:     'Submit ethics form',
      status:    'done',
      priority:  5,
      tags:      ['admin'],
      subtasks:  [
        { title: 'a9',                  done: true },
        { title: 'a10',    done: true },
      ],
      createdAt: new Date('2024-01-18'),
    },
    {
      userId:    aliceId,
      projectId: fyp,
      title:     'f1',
      status:    'f2',
      priority:  2,
      tags:      ['admin'],
      subtasks:  [],
      createdAt: new Date('2024-02-05'),
    },
   
    {
      userId:    aliceId,
      projectId: blog,
      title:     'f3',
      status:    'todo',
      priority:  2,
      tags:      ['writing', 'content'],
      subtasks:  [
        { title: 'Choose topic',        done: true  },
        { title: 'Write 500 words',     done: false },
      ],
      createdAt: new Date('2024-02-22'),
    },
    {
      userId:    aliceId,
      projectId: blog,
      title:     'Design blog logo',
      status:    'todo',
      priority:  1,
      tags:      ['design'],
      subtasks:  [],
      createdAt: new Date('2024-02-25'),
    },
    {
      userId:    aliceId,
      projectId: blog,
      title:     'Set up hosting on Vercel',
      status:    'todo',
      priority:  3,
      tags:      ['devops'],
      subtasks:  [{ title: 'Create account', done: false }],
      createdAt: new Date('2024-02-28'),
    },
    
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'Wireframe checkout flow',
      status:    'done',
      priority:  5,
      tags:      ['design', 'ux'],
      subtasks:  [
        { title: 'Sketch on paper',     done: true },
        { title: 'Transfer to Figma',   done: true },
      ],
      dueDate:   new Date('2024-03-20'),
      createdAt: new Date('2024-03-05'),
    },
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'Implement cart API',
      status:    'in-progress',
      priority:  4,
      tags:      ['backend', 'api'],
      subtasks:  [
        { title: 'POST /cart endpoint',        done: true  },
        { title: 'DELETE /cart/:id endpoint',  done: false },
      ],
      createdAt: new Date('2024-03-10'),
    },
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'Write integration tests',
      status:    'todo',
      priority:  3,
      tags:      ['testing'],
      subtasks:  [
        { title: 's1',            done: false },
        { title: 's2',   done: false },
      ],
      createdAt: new Date('2024-03-15'),
    },
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'Set up CI/CD pipeline',
      status:    'in-progress',
      priority:  4,
      tags:      ['devops', 'backend'],
      subtasks:  [
        { title: 's3', done: true  },
        { title: 's4',      done: false },
      ],
      createdAt: new Date('2024-03-12'),
    },
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'Fix mobile responsiveness',
      status:    'in-progress',
      priority:  4,
      tags:      ['frontend', 'ux'],
      subtasks:  [
        { title: 's5',   done: true  },
        { title: 's6',          done: false },
      ],
      createdAt: new Date('2024-03-22'),
    },
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'Deploy to staging',
      status:    'todo',
      priority:  5,
      tags:      ['devops'],
      subtasks:  [
        { title: 's7',    done: false },
        { title: 's8',     done: false },
      ],
      createdAt: new Date('2024-03-25'),
    },
    {
      userId:    aliceId,
      projectId: fyp,
      title:     'do this work',
      status:    'todo',
      priority:  5,
      tags:      ['writing'],
      subtasks:  [
        { title: 'p1',  done: false },
        { title: 'p2',   done: false },
        { title: 'p3',       done: false },
        { title: 'p4',    done: false },
      ],
      dueDate:   new Date('2024-06-01'),
      createdAt: new Date('2024-02-15'),
    },
  ]);

  
  await db.collection('notes').insertMany([
    {
      userId:    aliceId,
      projectId: fyp,
      title:     'a1',
      content:   'do work',  
      tags:      ['research', 'distributed-systems'],
      createdAt: new Date('2024-01-22'),
    },
    {
      userId:    aliceId,
      projectId: fyp,
      title:     'a2',
      content:   'focus on evalatuion',  
      tags:      ['feedback', 'research'],
      createdAt: new Date('2024-02-03'),
    },
    {
      userId:    aliceId,
      projectId: null,                  
      title:     'a3',
      content:   'do this work right now ', 
      tags:      ['books', 'learning'],
      createdAt: new Date('2024-02-18'),
    },
    {
      userId:    aliceId,
      projectId: blog,
      title:     'a4',
      content:   'hi i am doing this ',  
      tags:      ['content', 'writing'],
      createdAt: new Date('2024-02-24'),
    },
    {
      userId:    aliceId,
      projectId: fyp,
      title:     'a5',
      content:   'do this ',  
      tags:      ['research', 'benchmarks'],
      createdAt: new Date('2024-03-10'),
    },
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'do your work',
      content:   'hello.', 
      tags:      ['meeting', 'client'],
      createdAt: new Date('2024-03-02'),
    },
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'API design decisions',
      content:   'REST over GraphQL for simplicity. Versioned endpoints: /api/v1/...',  
      tags:      ['backend', 'api'],
      createdAt: new Date('2024-03-08'),
    },
    {
      userId:    bobId,
      projectId: null,                
      title:     'Personal reading list',
      content:   'Clean Code, The Pragmatic Programmer, DDIA.',  
      tags:      ['books', 'learning'],
      createdAt: new Date('2024-03-14'),
    },
    {
      userId:    bobId,
      projectId: ecomm,
      title:     'Staging environment checklist',
      content:   'Verify env vars, run migrations, smoke test payment flow.', 
      tags:      ['devops', 'checklist'],
      createdAt: new Date('2024-03-20'),
    },
    {
      userId:    aliceId,
      projectId: null,                 
      title:     'Conference talk ideas',
      content:   'P',  
      tags:      ['research', 'career'],
      createdAt: new Date('2024-03-18'),
    },
  ]);

  // ── Indexes ────────────────────────────────────────────────────────────────
  // Unique index on email — enforces Query 1's duplicate-rejection requirement
  await db.collection('users').createIndex({ email: 1 }, { unique: true });

  console.log('✓ Seed complete');
  process.exit(0);
})();