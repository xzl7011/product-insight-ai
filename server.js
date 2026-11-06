import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/analyze', (req, res) => {
  const idea = (req.body.idea || '').trim();
  if (!idea) return res.status(400).json({error: '请输入产品想法'});
  res.json({
    mode: 'demo',
    result: {
      targetUsers: '具有相关使用场景、需要更高效解决问题的目标用户',
      painPoints: ['现有流程效率较低', '需求信息不够结构化', '用户难以快速确定优先级'],
      features: [
        {name: '需求结构化分析', priority: 'P0'},
        {name: '功能优先级建议', priority: 'P0'},
        {name: '用户故事生成', priority: 'P1'}
      ],
      userStory: `作为目标用户，我希望系统帮助我分析“${idea}”，从而更快形成清晰的产品需求。`,
      acceptance: ['用户可以输入产品想法', '系统返回结构化需求分析', '用户可以查看功能优先级']
    }
  });
});

app.post('/api/feedback', (req, res) => {
  res.json({success: true, message: '反馈已记录（MVP 演示版本未持久化存储）'});
});

app.listen(process.env.PORT || 3000, () => console.log('Running on http://localhost:3000'));
